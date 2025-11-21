# GitHub Actions - Automated Plugin Building

## 🎯 What This Does

Automatically builds your Dynamics 365 plugin DLL in the cloud (on Windows) whenever you push code to GitHub.

**No Windows machine needed!**

---

## 📋 Setup Steps (15 minutes)

### Step 1: Create GitHub Repository (5 min)

1. Go to https://github.com
2. Sign in (or create free account)
3. Click **"New repository"**
4. Configure:
   - **Name:** `insideboard-dynamics-plugin`
   - **Description:** `Dynamics 365 plugin for Insideboard widget`
   - **Visibility:** Private (recommended)
   - **Initialize:** Don't check any boxes
5. Click **"Create repository"**

✅ **Repository created!**

---

### Step 2: Push Your Code (5 min)

**In Terminal on your Mac:**

```bash
cd /Users/hchahine/CascadeProjects/dynamics

# Initialize git (if not already)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit - Insideboard plugin"

# Add GitHub as remote (replace YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/insideboard-dynamics-plugin.git

# Push to GitHub
git branch -M main
git push -u origin main
```

**Replace `YOUR_USERNAME` with your actual GitHub username!**

✅ **Code is on GitHub!**

---

### Step 3: GitHub Actions Builds Automatically (2 min)

1. Go to your repository on GitHub
2. Click **"Actions"** tab
3. You'll see **"Build Dynamics Plugin"** running
4. Wait 2-3 minutes for build to complete
5. Green checkmark = Success! ✅

✅ **Plugin built automatically!**

---

### Step 4: Download the DLL (1 min)

**After build completes:**

1. Click on the completed workflow run
2. Scroll down to **"Artifacts"**
3. Click **"InsideboardWidget-Plugin"**
4. Downloads a ZIP file
5. Extract: `InsideboardWidget.Plugins.dll`

✅ **DLL ready to distribute!**

---

## 🔄 Future Builds

**Every time you push code:**

```bash
# Make changes to Plugin/GenerateInsideboardJWT.cs
# Then:

git add .
git commit -m "Updated plugin"
git push

# GitHub Actions automatically builds new DLL
# Download from Actions > Artifacts
```

**Automatic, no Windows needed!**

---

## 🏷️ Creating Releases

**For versioned releases:**

```bash
# Tag a version
git tag v1.0.0
git push origin v1.0.0

# GitHub Actions creates a Release with DLL attached
# Go to: Releases > Download DLL
```

---

## 📊 What GitHub Actions Does

```
1. Starts Windows VM in cloud
2. Installs .NET Framework SDK
3. Generates strong name key
4. Restores NuGet packages
5. Compiles your C# plugin
6. Signs the DLL
7. Uploads DLL as artifact
8. Keeps for 90 days
```

**All automatic, all free!**

---

## 💰 Cost

**GitHub Actions is FREE for:**
- ✅ Public repositories (unlimited)
- ✅ Private repositories (2,000 minutes/month)

**Your plugin builds take ~2-3 minutes each.**

**You can build ~600 times per month for free!**

---

## 🔐 Security

### What's Secure:
- ✅ Code in private repository
- ✅ Strong name key generated per build
- ✅ DLL signed automatically
- ✅ Only you can access artifacts

### What's Shared:
- ⚠️ Code is on GitHub (but private)
- ⚠️ Microsoft runs the build (trusted)

---

## 🎯 Distributing to Clients

### After Each Build:

1. Download DLL from GitHub Actions
2. Test in your Dynamics environment
3. Share DLL with clients
4. Provide installation guide

**Same DLL works for all clients!**

---

## 🔍 Troubleshooting

### "Build failed"
```
1. Go to Actions tab
2. Click failed run
3. Click failed step
4. Read error message
5. Fix code
6. Push again
```

### "Can't push to GitHub"
```bash
# Check remote URL
git remote -v

# Should show your GitHub repo
# If not, set it:
git remote set-url origin https://github.com/YOUR_USERNAME/insideboard-dynamics-plugin.git
```

### "No artifacts"
```
- Wait for build to complete (green checkmark)
- Artifacts appear after successful build
- Artifacts expire after 90 days
```

---

## 📋 Complete Workflow

```
YOU:
1. Write/modify C# code on Mac
2. git commit & push
3. Wait 2-3 minutes

GITHUB:
1. Detects push
2. Starts Windows VM
3. Builds plugin
4. Creates DLL artifact

YOU:
5. Download DLL
6. Test locally
7. Distribute to clients

CLIENTS:
8. Register DLL
9. Create Custom API
10. Configure & use
```

---

## ✅ Success Checklist

- [ ] GitHub account created
- [ ] Repository created (private)
- [ ] Code pushed to GitHub
- [ ] GitHub Actions workflow ran
- [ ] Build succeeded (green checkmark)
- [ ] DLL downloaded from Artifacts
- [ ] DLL tested in Dynamics
- [ ] Ready to distribute!

---

## 🎉 Benefits

### For You:
- ✅ No Windows machine needed
- ✅ Builds on Mac
- ✅ Automatic builds
- ✅ Version history
- ✅ Free

### For Clients:
- ✅ Professional DLL
- ✅ Properly signed
- ✅ Server-side JWT
- ✅ Maximum security

---

## 📞 Need Help?

### GitHub Issues:
- GitHub documentation: https://docs.github.com
- GitHub Actions docs: https://docs.github.com/actions

### Build Issues:
- Check Actions tab for error logs
- Verify Plugin/ folder structure
- Ensure all files are committed

---

**Ready to set up? Follow Step 1 and create your GitHub repository!** 🚀
