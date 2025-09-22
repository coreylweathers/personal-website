document.addEventListener('DOMContentLoaded', function() {
    const logo = document.querySelector('.header-title .logo, .header-title img');
    if (logo) {
        logo.setAttribute('title', 'Home');
        logo.style.cursor = 'pointer';
    }

    /* Interactive Tags Explorer ( /tags ) */
    const tagsExplorer = document.querySelector('.tags-explorer[data-taxonomy="tags"]');
    if (!tagsExplorer) return;

    const tagFilterInput = document.getElementById('tag-filter');
    const postSearchInput = document.getElementById('post-search');
    const tagList = document.getElementById('tag-list');
    const postsContainer = document.getElementById('posts-container');
    const activeTagEl = document.getElementById('active-tag');
    const tagCountEl = document.getElementById('tag-count');
    const embeddedDataEl = document.getElementById('tag-data');
    let embeddedTagData = {};
    if (embeddedDataEl) {
        try { embeddedTagData = JSON.parse(embeddedDataEl.textContent || '{}'); } catch { embeddedTagData = {}; }
    }

    // Check if we're on a specific tag page and should auto-activate
    const activeTagSlug = tagsExplorer.getAttribute('data-active-tag');

    if (!tagList) return;

    const allTagItems = Array.from(tagList.querySelectorAll('.tag-item'));

    // Utility: de-duplicate posts by canonical href (strip trailing slash)
    function dedupePosts(posts) {
        const seen = new Set();
        const canon = href => {
            try {
                const u = new URL(href, window.location.origin);
                let p = u.pathname.replace(/index\.html$/i,'');
                if (p !== '/' && p.endsWith('/')) p = p.slice(0,-1);
                return p.toLowerCase();
            } catch { return href.toLowerCase(); }
        };
        return posts.filter(p => {
            if (!p || !p.href) return false;
            const key = canon(p.href);
            if (seen.has(key)) return false;
            seen.add(key);
            return true;
        });
    }

    function loadPostsFromEmbeddedData(tagSlug, tagDisplayName) {
        if (embeddedTagData && embeddedTagData[tagSlug]) {
            let posts = embeddedTagData[tagSlug].map(p => ({
                title: p.title,
                href: p.permalink,
                date: p.date,
                summary: p.summary || '',
                text: (p.title + ' ' + (p.summary || '')).toLowerCase()
            }));
            posts = dedupePosts(posts);
            renderPosts(posts);
            activeTagEl.textContent = 'Posts tagged: ' + tagDisplayName;
            postSearchInput.disabled = false;
            postSearchInput.focus();
            postSearchInput.dataset.posts = JSON.stringify(posts);
            return true;
        }
        return false;
    }

    function updateTagCount() {
        const visible = allTagItems.filter(li => li.style.display !== 'none').length;
        tagCountEl.textContent = visible + ' tag' + (visible === 1 ? '' : 's');
    }

    function filterTags() {
        const q = tagFilterInput.value.trim().toLowerCase();
        allTagItems.forEach(li => {
            const name = li.textContent.toLowerCase();
            li.style.display = name.includes(q) ? '' : 'none';
        });
        updateTagCount();
    }

    tagFilterInput?.addEventListener('input', filterTags);
    updateTagCount();

    // Auto-activate tag if we're on a specific tag page
    if (activeTagSlug && embeddedTagData[activeTagSlug]) {
        const targetTagItem = tagList.querySelector(`[data-tag="${activeTagSlug}"]`);
        if (targetTagItem) {
            const tagLink = targetTagItem.querySelector('.tag-link');
            if (tagLink) {
                targetTagItem.classList.add('active');
                loadPostsFromEmbeddedData(activeTagSlug, tagLink.textContent.replace(/\s+\d+$/, ''));
            }
        }
    }

    async function loadPostsForTag(tagLink) {
        if (!tagLink) return;
        const url = tagLink.getAttribute('href');
        if (!url) return;
        activeTagEl.textContent = 'Loading…';
        postsContainer.innerHTML = '';
        postSearchInput.value = '';
        postSearchInput.disabled = true;
        // If we have embedded data, use it directly (no fetch), matching tag slug
        const tagSlug = url.replace(/\/$/, '').split('/').filter(Boolean).pop();
        if (loadPostsFromEmbeddedData(tagSlug, tagLink.textContent.replace(/\s+\d+$/, ''))) {
            return;
        }
        // Fallback network fetch path
        try {
            const res = await fetch(url);
            const html = await res.text();
            const doc = new DOMParser().parseFromString(html, 'text/html');
            // Support both original theme list (.archive-item) and custom term layout (.archive-post)
            const postEntries = Array.from(doc.querySelectorAll('.archive-item, .archive-post'));
                        if (!postEntries.length) {
                                // Fallback: try using global search index if available
                                try {
                                        const idxRes = await fetch('/index.json');
                                        if (idxRes.ok) {
                                                const indexData = await idxRes.json();
                                                const tagSlug = tagLink.getAttribute('href').replace(/\/$/, '').split('/').pop();
                                                let posts = (indexData || [])
                                                    .filter(p => Array.isArray(p.tags) && p.tags.map(t=>t.toLowerCase()).includes(tagSlug.toLowerCase()))
                                                    .map(p => ({
                                                        title: p.title || 'Untitled',
                                                        href: p.permalink || p.relpermalink || '#',
                                                        date: p.date || '',
                                                        summary: p.summary || '',
                                                        text: ((p.title||'') + ' ' + (p.summary||'')).toLowerCase()
                                                    }));
                                                posts = dedupePosts(posts);
                                                if (posts.length) {
                                                        renderPosts(posts);
                                                        activeTagEl.textContent = 'Posts tagged: ' + tagLink.textContent.replace(/\s+\d+$/, '');
                                                        postSearchInput.disabled = false;
                                                        postSearchInput.focus();
                                                        postSearchInput.dataset.posts = JSON.stringify(posts);
                                                        return;
                                                }
                                        }
                                } catch(_) {}
                                activeTagEl.textContent = 'No posts';
                                postsContainer.innerHTML = '<div class="no-results">No posts for this tag.</div>';
                                return;
                        }
            let posts = postEntries.map(item => {
                const linkEl = item.querySelector('a.archive-item-link') || item.querySelector('.archive-post-title a') || item.querySelector('h2 a') || item.querySelector('a');
                const dateEl = item.querySelector('.archive-item-date') || item.querySelector('.archive-post-date') || item.querySelector('time');
                const summaryEl = item.querySelector('.archive-post-summary');
                return {
                    title: linkEl?.textContent?.trim() || 'Untitled',
                    href: linkEl?.getAttribute('href') || '#',
                    date: dateEl?.textContent?.trim() || '',
                    summary: summaryEl?.textContent?.trim() || '',
                    text: (linkEl?.textContent || '').toLowerCase() + ' ' + (summaryEl?.textContent || '').toLowerCase()
                };
            });
            posts = dedupePosts(posts);
            renderPosts(posts);
            activeTagEl.textContent = 'Posts tagged: ' + tagLink.textContent.replace(/\s+\d+$/, '');
            postSearchInput.disabled = false;
            postSearchInput.focus();
            postSearchInput.dataset.posts = JSON.stringify(posts);
        } catch (e) {
            activeTagEl.textContent = 'Error loading posts';
            postsContainer.innerHTML = '<div class="no-results">Failed to load posts.</div>';
        }
    }

    function renderPosts(posts) {
        postsContainer.innerHTML = posts.map(p => `
            <div class="post-card" data-title="${p.title.toLowerCase()}" data-text="${(p.text || '').replace(/"/g,'&quot;')}">
                <h3 class="post-card-title"><a href="${p.href}">${p.title}</a></h3>
                ${p.date ? `<div class="post-card-date">${p.date}</div>` : ''}
                ${p.summary ? `<div class="post-card-summary">${p.summary}</div>` : ''}
            </div>`).join('');
    }

    function filterPosts() {
        const query = postSearchInput.value.trim().toLowerCase();
        let visible = 0;
        postsContainer.querySelectorAll('.post-card').forEach(card => {
            const text = (card.getAttribute('data-text') || card.getAttribute('data-title') || '');
            const match = text.includes(query);
            card.style.display = match ? '' : 'none';
            if (match) visible++;
        });
        if (visible === 0) {
            if (!postsContainer.querySelector('.no-results')) {
                const div = document.createElement('div');
                div.className = 'no-results';
                div.textContent = 'No matching posts.';
                postsContainer.appendChild(div);
            }
        } else {
            const nr = postsContainer.querySelector('.no-results');
            if (nr) nr.remove();
        }
    }

    postSearchInput?.addEventListener('input', filterPosts);

    // Tag click handling
    tagList.addEventListener('click', function(e) {
        const a = e.target.closest('a.tag-link');
        if (!a) return;
        e.preventDefault();
        allTagItems.forEach(li => li.classList.remove('active'));
        a.parentElement.classList.add('active');
        loadPostsForTag(a);
    });

    // Auto-select tag if page specifies an active tag (single tag page)
    const predefined = tagsExplorer.getAttribute('data-active-tag');
    if (predefined) {
        const target = allTagItems.find(li => li.getAttribute('data-tag') === predefined);
        if (target) {
            target.classList.add('active');
            const link = target.querySelector('a.tag-link');
            if (link) {
                loadPostsForTag(link);
            }
        }
    }
});