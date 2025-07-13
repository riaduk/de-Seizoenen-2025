---
description: A description of your rule
---

Always follow these front-end development principles: - Use best practices in accessibility (WCAG-compliant) and responsive design - Use modern, semantic HTML5, CSS3, and JavaScript (ES6+) - Avoid all inline CSS, even when modifying elements via JavaScript - Use `rem` units for sizing and spacing - Prefer CSS variables and class- or ID-based styling only - Respect this CSS structure:
• `root-universal.css` for variables, resets, and root styles
• `style.css` imports all CSS files
• `main.css` contains most styling code
• `queries.css` is for responsive rules
• other CSS files follow the same structure if needed - Keep code DRY, readable, and reusable - Use consistent and semantic markup
