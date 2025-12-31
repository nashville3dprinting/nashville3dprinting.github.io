Gallery Page:

Adding New Images

Update galleryData.js:

{
  id: 1,
  title: "My Photo",
  src: "/images/photo1.jpg",
  date: "2024-01-20",
  category: "Travel",
  tags: ["mountains", "forest"],
  description: "Shot during a trip to the mountains."
}

📸 Gallery System

The project includes a fully responsive, customizable gallery component designed for portfolios, product showcases, and visual collections.

✨ Features
Filtering

Multi-select category filtering

Filter popover with checkboxes

"Clear" and "Done" controls

Outside-click closes the popover

Search

Real-time search

Matches title, category, and tags

Case-insensitive

Mobile-friendly (no zoom on iOS)

Sorting

Newest

Oldest

Title A–Z

Title Z–A

Pagination

User can choose items per page (12 / 24 / 48)

Fully recalculates when filters or search change

Responsive Layout

4 columns on desktop

3 on tablets

2 on mobile

Consistent image sizing using aspect-ratio

Lightbox Viewer

Large view of the selected photo

Arrow-key navigation (← →)

Prev/Next buttons

Click outside to close

ESC key closes

Details panel shows:

Title

Date

Category

Tags

Description

Interactive Tags

Clicking a tag auto-filters the gallery

Lightbox closes and shows updated results

Performance

All images use native lazy loading

Efficient filtering/searching even with large galleries