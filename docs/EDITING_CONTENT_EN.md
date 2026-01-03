# Content Editing Guide - Arca Studios

This guide explains how to edit texts and content on the Arca Studios website.

## 📁 File Structure

All website texts are located in JSON files within the `src/app/translations/` folder. The structure is organized by language:

```
src/app/translations/
├── pt/          # Portuguese
│   ├── header.json
│   ├── home.json
│   ├── about.json
│   ├── portfolio.json
│   ├── projects.json
│   ├── contact.json
│   └── footer.json
├── en/          # English
│   └── (same structure)
└── es/          # Spanish
    └── (same structure)
```

## 🔧 How to Edit

### 1. Edit Page Texts

Each page has its own JSON file. For example, to edit the "About Us" page:

1. Open the file `src/app/translations/en/about.json`
2. Edit the JSON values (keep the keys the same)
3. Save the file
4. Repeat for other languages (`pt/about.json`, `es/about.json`)

**Example:**

```json
{
  "title": "About Us",
  "heading": "Transforming brands into stories",
  "description": "We are an agency specialized..."
}
```

### 2. Edit Portfolio Projects

Projects are in `src/app/translations/*/projects.json`. Each project has:

- `id`: Unique project number (don't change)
- `name`: Project name
- `description`: Short description (appears in grid)
- `image`: Image path (`/images/projects/project1.png`)
- `category`: Category (e.g., "Branding", "Marketing")
- `client`: Client name
- `year`: Project year
- `overview`: Complete overview
- `challenge`: Challenge faced
- `solution`: Solution implemented
- `results`: Array of results (list)
- `services`: Array of services offered

**Editing example:**

```json
{
  "id": 1,
  "name": "My Project",
  "description": "Complete branding",
  "image": "/images/projects/project1.png",
  "category": "Branding",
  "client": "Client XYZ",
  "year": "2024",
  "overview": "This project was developed...",
  "challenge": "The main challenge was...",
  "solution": "We developed a strategy...",
  "results": [
    "Result 1",
    "Result 2",
    "Result 3"
  ],
  "services": ["Branding", "Design", "Strategy"]
}
```

### 3. Add New Project

To add a new project:

1. Open `src/app/translations/en/projects.json`
2. Add a new object to the `projects` array
3. Use a unique `id` (sequential, e.g., 7, 8, 9...)
4. Fill in all fields
5. Repeat for other languages

**Important:** The `id` must be the same in all languages!

### 4. Edit Interface Labels

Some interface texts are in `portfolio.json` under the `detail` section:

```json
{
  "detail": {
    "backToPortfolio": "Back to portfolio",
    "client": "Client",
    "services": "Services",
    "overview": "Overview",
    "challenge": "Challenge",
    "solution": "Solution",
    "results": "Results",
    "ctaTitle": "Have a project in mind?",
    "ctaText": "Let's talk...",
    "ctaButton": "Get in touch",
    "loading": "Loading..."
  }
}
```

## ⚠️ Important Rules

1. **Keep valid JSON structure**: Always close braces `{}` and brackets `[]`
2. **Use double quotes**: `"text"` and not `'text'`
3. **Commas**: Use commas between items, but not after the last one
4. **Consistent IDs**: The same project must have the same `id` in all languages
5. **Edit all languages**: To keep the site multilingual, edit PT, EN, and ES

## 📝 Editing Examples

### Edit Project Name

**Before:**
```json
{
  "id": 1,
  "name": "Example Project 1"
}
```

**After:**
```json
{
  "id": 1,
  "name": "Complete Rebranding - Client XYZ"
}
```

### Add Result to a Project

**Before:**
```json
{
  "results": [
    "150% increase in recognition",
    "80% growth on social media"
  ]
}
```

**After:**
```json
{
  "results": [
    "150% increase in recognition",
    "80% growth on social media",
    "New result added"
  ]
}
```

### Edit CTA Text

**Before:**
```json
{
  "detail": {
    "ctaTitle": "Have a project in mind?"
  }
}
```

**After:**
```json
{
  "detail": {
    "ctaTitle": "Let's work together?"
  }
}
```

## 🖼️ Add Project Images

1. Place the image in the `public/images/projects/` folder
2. Name the file (e.g., `my-project.png`)
3. Update the `image` field in JSON:
   ```json
   {
     "image": "/images/projects/my-project.png"
   }
   ```

## 🔄 After Editing

After making edits:

1. Save all files
2. The development server reloads automatically
3. Check the website in the browser
4. Test in all languages (PT, EN, ES)

## 📚 Files by Page

- **Header/Navigation**: `header.json`
- **Home Page**: `home.json`
- **About Us**: `about.json`
- **Portfolio (grid)**: `portfolio.json`
- **Projects (details)**: `projects.json`
- **Contact**: `contact.json`
- **Footer**: `footer.json`

## ❓ Frequently Asked Questions

**Q: Can I add new fields?**
A: Yes, but you'll need to update the TypeScript components to use those fields.

**Q: What if I forget to edit one language?**
A: The site will show the text from the last edited language. Always edit all 3 languages.

**Q: How to remove a project?**
A: Remove the object from the `projects` array in all language files.

**Q: Can I use HTML in texts?**
A: No, texts are rendered as plain text. Use normal line breaks.

## 🆘 Common Problems

**Invalid JSON error:**
- Check for extra or missing commas
- Check if all braces are closed
- Use an online JSON validator

**Text doesn't appear:**
- Check if you edited the correct file
- Check if the key is correct
- Clear browser cache

**Project doesn't appear:**
- Check if the `id` is correct
- Check if you added it in all languages
- Check if the image exists at the specified path

---

**Last updated:** 2024

