# Project X • Arena Breakout PC Web Radar Website

Modern landing page website for **Project X Web Radar** for Arena Breakout: Infinite PC.

## 🚀 GitHub Pages Deployment Guide

Follow these simple steps to host this website live on GitHub Pages:

### 1. Create a Repository on GitHub
1. Go to [GitHub - Create a New Repository](https://github.com/new).
2. Set Repository Name: `project_x_website` (or `username.github.io` for root domain).
3. Select **Public**.
4. Leave **Initialize this repository with a README** **UNCHECKED**.
5. Click **Create repository**.

### 2. Push Your Local Code
Open terminal in this directory (`C:\Users\Oguzhan\Desktop\project_x_website`) and run:

```bash
git remote add origin https://github.com/YOUR_USERNAME/project_x_website.git
git push -u origin main
```
*(Replace `YOUR_USERNAME` with your actual GitHub username).*

### 3. Enable GitHub Pages
1. Go to your repository settings on GitHub: `https://github.com/YOUR_USERNAME/project_x_website/settings/pages`
2. Under **Build and deployment** -> **Source**:
   - Option A (Automated): Select **GitHub Actions** (uses `.github/workflows/static.yml`).
   - Option B (Standard): Select **Deploy from a branch** -> `main` / `/(root)`.
3. Save changes.

Your website will be live at:
`https://YOUR_USERNAME.github.io/project_x_website/`

---

## 🛠️ Features Included
- **Responsive Layout**: Designed for Desktop, Tablet, and Mobile.
- **Dark / Light Theme Toggle**: Seamless switching between cyber dark and clean light modes.
- **Dynamic Node Canvas**: Animated network background.
- **Feature Showcase & Screenshots**: Interactive image showcase slider.
- **Instant Purchase Modal**: Plan selector for VIP access.
