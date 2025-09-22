---
date: '2025-06-15T09:00:00-04:00'
draft: true
title: 'Introducing My AI-Powered Fractions App: Built with .NET, Blazor, and Aspire'
description: 'Building an interactive AI-powered fractions learning app with .NET, Blazor, and Aspire to help kids visualize math concepts while exploring modern development practices in public.'
summary: 'Building an interactive AI-powered fractions learning app with .NET, Blazor, and Aspire to help kids visualize math concepts while exploring modern development practices in public.'
keywords: ["DevRel", "Building in Public", ".NET", "Blazor", "AI", "Education Technology", "C#", "MAUI", "Aspire", "PostgreSQL", "Parenting", "Developer Experience", "Interactive Learning", "Fraction Visualization", "Gamification", "Adaptive Learning", "Mobile Development", "Web Development", "Entity Framework", "Developer Advocacy", "Open Source", "Livestreaming", "Developer Community", "Educational Apps", "Math Learning", "Cross-Platform Development"]
featuredImagePreview: "images/posts/intro-ai-powered-fractions-banner.png"
featuredImage: "images/posts/intro-ai-powered-fractions-header.png"
featuredImageAlt: "Illustration of a smiling person in an orange shirt next to a computer screen showing fractions and charts."
categories: ["Projects"]
tags: ["DevRel", ".NET", "Blazor", "AI", "Education", "Parenting", "Building in Public"]
slug: "ai-powered-fractions-app-introduction"
series: ["Building an AI-Powered Fractions App"]
---

***TL;DR***: I am building an interactive AI-powered fractions learning app to help kids visualize math in a fun way, while exploring .NET, Blazor, and AI as both a developer and parent. The app focuses on fraction visualization, gamification, and adaptive learning built with C#, Blazor, .NET MAUI, and PostgreSQL for scalability. But this isn't about writing code. It is about learning in public, experimenting, and sharing insights with the developer community. If you are curious, join me on GitHub, follow the blog, or tune into my Saturday livestreams as I build this in real time! 🚀

{{< optimized-image src="images/posts/intro-ai-powered-fractions.png" alt="AI-powered fractions learning app interface showing interactive fraction visualization and gamification elements" >}}

## Why I'm Building a Fractions Learning App—As a Parent and Developer
If there is one thing I've learned in developer relations at an identity company, it's that identity is not singular—**it's layered**. 

When I introduce myself in difference conversations, I might start with I am **a .NET developer, a parent to two young children, or a developer relations leader** depending on the context. But at my core, I have always loved building magical experiences with software by turning everyday problems into creative solutions.

One of those recent experiences came from watching my kids learn math. The way my kids are taught math today is different from what I was taught. After talking with the other parents in my kid's class, I realized I wasn't alone. Many of us had the same reaction: _"this isn't how we learned fractions!"_

As I watched my daughter wrestle with adding and subtracting fractions - and found myself struggling to explain it - I had an idea: _why not build an app that connects her learning style with something fun and exciting?_ 

## What is This Fractions App?
The main goal of this app is simple: help kids understand fractions through interactive exercises. If I get this right, it will make math feel approachable and fun.
So, here's the core feature list I've come up with:

<ul style="list-style: none; padding-left: 0;">
  <li>✅ <strong>Fraction Visualization</strong> – Users can see fractions break down in real time, making concepts easier to grasp.</li>
  <li>✅ <strong>Gamification</strong> – Earn points for correct answers and solve interactive challenges to keep learning engaging.</li>
  <li>✅ <strong>AI-Powered Adaptive Learning</strong> – The app adjusts difficulty based on individual progress.</li>
  <li>✅ <strong>Hands-On Fraction Operations</strong> – Users can add, subtract, multiply, and divide fractions with guided interactions.</li>
</ul>

## How .NET, Blazor, and AI Power My Fractions App
One of the reasons I love C# and .NET is its versatility. With the .NET runtime, I can build the app I need for multiple platforms using a familiar code stack and tooling—whether it's a tablet-friendly UI for my daughter or a keyboard-and-mouse driven web experience for me.

### Core Tech Stack
Here's what I'm using to build my interactive fractions app:
<ul style="list-style: none; padding-left: 0;">
  <li>✅ <strong>Programming Language:</strong> C#</li>
  <li style="padding-bottom: 0.5rem;">✔ <em>Why?</em> C# is powerful, flexible, and widely used for modern application development.</li>
  <li>✅ <strong>Web Layer:</strong> Blazor & ASP.NET Core</li>
  <li style="padding-bottom: 0.5rem;">✔ <em>Why?</em> I've loved Blazor since its experimental days. I strongly believe it's one of the best ways for C# developers to build web applications using their strong .NET developer skills.</li>
  <li>✅ <strong>Mobile Layer:</strong> Blazor Hybrid & .NET MAUI</li>
  <li style="padding-bottom: 0.5rem;">✔ <em>Why?</em> I wanted to reuse web components, and Blazor Hybrid allows that inside MAUI for a native-like mobile experience. As a bonus - this is my first time using MAUI. So, this part will be a learning journey!</li>
  <li>✅ <strong>Data Storage:</strong> PostgreSQL & Entity Framework</li>
  <li style="padding-bottom: 0.5rem;">✔ <em>Why?</em> I have done a lot of work with SQL Server, but I wanted to explore PostgreSQL as a modern alternative. This adds storage to the project while expanding my database experience.</li>
</ul>

## Additional Concerns: Performance, Security, and Orchestration
Beyond the tech stack, I'm also considering adding some key architectural elements to address things like scalability, security, and data flow across the app:

<ul style="list-style: none; padding-left: 0;">
  <li>✅ <strong>Caching for Better Performance</strong></li>
  <li style="padding-bottom: 0.5rem;">✔ <em>Why?</em> I want to make sure this provides a fast, responsive experience. So, I'll implement some caching to reduce unnecessary database calls and refine frequently accessed data.</li>
  <li>✅ <strong>API for Frontend-Backend Communication</strong></li>
  <li style="padding-bottom: 0.5rem;">✔ <em>Why?</em> Most of the interactions between the Blazor UI, MAUI mobile layer, and the database should go through an API. This will make sure there is consistent data flow and structured communication between front end components and backend services.</li>
  <li>✅ <strong>Identity for Personalized User Experiences</strong></li>
  <li style="padding-bottom: 0.5rem;">✔ <em>Why?</em> I think it would be nice to ensure both kids and parents have a great experience here. A secure identity system will allow for profile-based experiences, letting parents track their children's progress while keeping data private and safe.</li>
  <li>✅ <strong>.NET Aspire for Orchestration</strong></li>
  <li style="padding-bottom: 0.5rem;">✔ <em>Why?</em> With multiple moving parts—frontend, API, data storage, authentication—I'll be using .NET Aspire to orchestrate everything efficiently, ensuring that each service communicates seamlessly while supporting scalability and modular design.</li>
</ul>

## Beyond Code: The Learning and Advocacy Behind My Fractions App
At the beginning of this post, I shared – I'm a .NET developer, a parent, and a developer relations leader. This project isn't just about creating an educational app—it's also about exploring, learning, and building in public.

- **As a parent** – I want to understand how kids learn math today. Using interactive visualization helps boost their confidence.
- **As a developer** – This gives me a chance to dive into the latest .NET updates to C# and Blazor while learning how to build AI powered learning experiences.
- **As a developer advocate** – Building this app in public is a way to showcase advocacy and engagement strategies and show how open collaboration fosters learning.

I believe **the most effective developer advocates are developers first**—they learn, experiment, and break things; they share those lessons with the community while also learning along the way. After all, DevRel isn't just about talking tech—***it's about solving real problems with and for developers***.

That's why I'm sharing this journey. Whether you're a .NET developer exploring Blazor and AI, a DevRel professional interested in different approaches to advocacy, or a developer marketer thinking about content strategies, this project has something for you.

## How to Follow and Contribute
If this project resonates with you, here's how you can stay engaged and contribute:
<ul style="list-style: none; padding-left: 0;">
  <li>✅ <strong>Follow the GitHub Repository</strong> (coming soon!) – Join discussions, feature requests, and code reviews within the repo.</li>
  <li>✅ <strong>Read this blog series</strong> – I'll share technical insights as I build here on the site and on social media.</li>
  <li>✅ <strong>Join my Saturday livestreams</strong> – I'll be live on Saturday mornings across LinkedIn, Twitch, and YouTube. Join us for real-time coding, Q&A, and open developer discussions.</li>
</ul>

💡 **Next Up**: In the next post, I'll break down setting up your local development environment and the first UI components—stay tuned! 

Thanks for reading.😉

Corey.
