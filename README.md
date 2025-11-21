# Insideboard Widget - Enterprise Solution

**Server-side JWT generation with Custom API and C# Plugin**

---

## 🎯 Overview

This is an **enterprise-grade solution** with:
- ✅ **Custom API** for server-side JWT generation
- ✅ **C# Plugin** (HMAC-SHA256 in sandbox)
- ✅ **Maximum security** (secret never leaves server)
- ✅ **Full audit trail** (Plugin Trace Logs)
- ✅ **Professional packaging**

---

## 📦 What's Included

### Plugin Source Code:
- `Plugin/GenerateInsideboardJWT.cs` - C# plugin
- `Plugin/InsideboardWidget.Plugins.csproj` - Visual Studio project
- `Plugin/packages.config` - NuGet dependencies
- `Plugin/Properties/AssemblyInfo.cs` - Assembly metadata

### JavaScript:
- `insideboard_loader.js` - Calls Custom API

### Documentation:
- `README.md` - This file
- Installation guides (to be created after build)

---

## ⚠️ IMPORTANT: Build Required

**This solution requires building a plugin DLL.**

You need:
- Windows PC (or VM)
- Visual Studio 2019+ (Community Edition is free)
- .NET Framework 4.6.2+

---

## 🚀 Installation Process

### Phase 1: Build Plugin (One-Time, 60 min)

#### Step 1: Install Visual Studio
- Download Visual Studio 2019+ Community Edition (free)
- Install ".NET desktop development" workload

#### Step 2: Open Project
```
1. Launch Visual Studio
2. File > Open > Project/Solution
3. Navigate to: Plugin/InsideboardWidget.Plugins.csproj
4. Click Open
```

#### Step 3: Generate Strong Name Key
```
1. Solution Explorer > Right-click project > Properties
2. Go to "Signing" tab
3. Check ☑ "Sign the assembly"
4. Dropdown: <New...>
5. Key file name: key.snk
6. Uncheck "Protect my key file with a password"
7. Click OK
8. Save (Ctrl+S)
```

#### Step 4: Restore NuGet Packages
```
1. Solution Explorer > Right-click solution
2. Select "Restore NuGet Packages"
3. Wait for completion
```

#### Step 5: Build
```
1. Build > Build Solution (Ctrl+Shift+B)
2. Check Output: "Build succeeded"
3. DLL location: Plugin/bin/Release/InsideboardWidget.Plugins.dll
```

✅ **Plugin DLL is ready!**

---

### Phase 2: Register Plugin (20 min)

#### Step 1: Download Plugin Registration Tool
- https://www.nuget.org/packages/Microsoft.CrmSdk.XrmTooling.PluginRegistrationTool/
- Extract and run PluginRegistration.exe

#### Step 2: Connect to Dynamics
```
1. Create New Connection
2. Select Office 365
3. Enter credentials
4. Select organization
5. Login
```

#### Step 3: Register Assembly
```
1. Register > Register New Assembly
2. Browse to: Plugin/bin/Release/InsideboardWidget.Plugins.dll
3. Isolation Mode: Sandbox
4. Location: Database
5. Register Selected Plugins
```

#### Step 4: Register Plugin Step
```
1. Find: InsideboardWidget.Plugins.GenerateInsideboardJWT
2. Right-click > Register New Step
3. Message: new_GenerateInsideboardJWT
4. Primary Entity: (leave empty)
5. Event Pipeline Stage: PostOperation
6. Execution Mode: Synchronous
7. Deployment: Server
8. Register New Step
```

✅ **Plugin registered!**

---

### Phase 3: Create Custom API (15 min)

#### Via Power Apps (make.powerapps.com):

**1. Create Custom API:**
```
Name: new_GenerateInsideboardJWT
Display Name: Generate Insideboard JWT
Binding Type: Global
Is Function: No
Plugin Type: InsideboardWidget.Plugins.GenerateInsideboardJWT
```

**2. Add Request Parameters:**
```
Parameter 1:
  - Name: UserEmail
  - Type: String
  - Required: Yes

Parameter 2:
  - Name: SecretKey
  - Type: String
  - Required: Yes
```

**3. Add Response Parameter:**
```
Parameter:
  - Name: JWT
  - Type: String
```

✅ **Custom API created!**

---

### Phase 4: Deploy JavaScript (10 min)

#### Step 1: Upload Web Resource
```
1. Dynamics > Settings > Solutions
2. New > Web Resource
3. Name: new_/js/insideboard_loader.js
4. Type: Script (JScript)
5. Upload: insideboard_loader.js
6. Save & Publish
```

#### Step 2: Create Environment Variables
```
Create 3 variables:
1. new_insideboard_instance
2. new_insideboard_widgetcode
3. new_insideboard_secretkey (mark as Secret)
```

#### Step 3: Set Values
```
For each variable:
  - Add "Current Value"
  - Save
```

#### Step 4: Add to Forms
```
1. Customize entity forms
2. Add library: new_/js/insideboard_loader.js
3. Add OnLoad: InsideboardLoader.init
4. Publish
```

✅ **Installation complete!**

---

## 🧪 Testing

### Test Custom API:
```javascript
// In browser console (F12)
var req = new XMLHttpRequest();
req.open('POST', '/api/data/v9.2/new_GenerateInsideboardJWT', true);
req.setRequestHeader('OData-MaxVersion', '4.0');
req.setRequestHeader('OData-Version', '4.0');
req.setRequestHeader('Accept', 'application/json');
req.setRequestHeader('Content-Type', 'application/json');

req.onload = function() {
    console.log('Response:', JSON.parse(this.response));
};

req.send(JSON.stringify({
    UserEmail: "test@example.com",
    SecretKey: "test-key"
}));
```

**Expected:** `{ "JWT": "eyJhbGci..." }`

### Test on Form:
```
Open form > F12 > Console:
✅ Insideboard widget initializing (Custom API version)...
✅ Calling Custom API to generate JWT...
✅ JWT generated via Custom API
✅ Insideboard widget initialized successfully
```

---

## 🔐 Security Features

### Server-Side JWT Generation:
- ✅ Secret key never sent to browser
- ✅ Plugin runs in sandbox (isolated)
- ✅ HMAC-SHA256 on server
- ✅ Full audit trail in Plugin Trace Logs

### Access Control:
- ✅ Custom API can require specific privileges
- ✅ Plugin execution is logged
- ✅ Environment variables encrypted (marked as Secret)

### Audit Trail:
```
Settings > System > Plugin Trace Log
Filter by: GenerateInsideboardJWT
View all JWT generation requests
```

---

## 📊 Installation Time

| Phase | Time | Frequency |
|-------|------|-----------|
| Build plugin | 60 min | One-time |
| Register plugin | 20 min | One-time |
| Create Custom API | 15 min | One-time |
| Deploy JavaScript | 10 min | Per environment |
| **Total** | **105 min** | **First time** |
| **Per environment** | **10 min** | **After build** |

---

## 🔄 Distribution

### Build Once, Distribute Forever:

**You (Developer):**
1. Build plugin DLL (one-time)
2. Share DLL with clients
3. Provide installation guide

**Clients:**
1. Register your DLL (20 min)
2. Create Custom API (15 min)
3. Deploy JavaScript (10 min)
4. Configure variables (5 min)
5. **Total: 50 minutes**

---

## 🔍 Troubleshooting

### Plugin Issues:
```
Problem: Plugin not found
Solution: Check Plugin Registration Tool

Problem: Plugin execution failed
Solution: Check Plugin Trace Logs
  Settings > System > Plugin Trace Log
```

### Custom API Issues:
```
Problem: Custom API not found (404)
Solution: Wait 5 min for cache refresh
  Check Power Apps for API definition

Problem: Unauthorized (401)
Solution: Check Custom API privileges
```

### JavaScript Issues:
```
Problem: Custom API call failed
Solution: Check Network tab (F12)
  Verify API name matches exactly

Problem: Environment variables not found
Solution: Ensure "Current Value" is set
```

---

## 📋 Requirements

- Windows PC (for building plugin)
- Visual Studio 2019+
- Dynamics 365 (Online or On-Premises)
- System Administrator access
- Plugin Registration Tool
- Insideboard credentials

---

## ✅ Success Checklist

- [ ] Plugin DLL built
- [ ] Plugin registered in Dynamics
- [ ] Plugin step configured
- [ ] Custom API created
- [ ] Custom API responds to test
- [ ] JavaScript uploaded as web resource
- [ ] 3 environment variables created
- [ ] Environment variable values set
- [ ] Script added to forms
- [ ] Forms published
- [ ] Widget loads on form
- [ ] No errors in console
- [ ] ✅ Installation complete!

---

## 🎯 Why This Solution?

### vs Client-Side:
- ✅ **More secure** (server-side JWT)
- ✅ **Audit trail** (Plugin Trace Logs)
- ✅ **Compliance-ready**

### Trade-offs:
- ⚠️ **More complex** (requires Visual Studio)
- ⚠️ **Longer setup** (105 min first time)
- ⚠️ **Windows required** (for building)

---

## 📞 Support

- Check Plugin Trace Logs for errors
- Verify Custom API in Power Apps
- Test API independently before full integration
- Ensure environment variables have "Current Value"

---

**Ready to build? Open Plugin/InsideboardWidget.Plugins.csproj in Visual Studio!** 🚀
