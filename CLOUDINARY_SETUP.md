# Cloudinary Setup Guide

This guide will help you configure Cloudinary for avatar uploads in your portfolio app.

## Step 1: Get Your Cloudinary Credentials

1. Go to [Cloudinary Console](https://console.cloudinary.com/)
2. Sign up or log in to your account
3. On the Dashboard, you'll see:
   - **Cloud Name** (e.g., `dxyz123abc`)
   - **API Key** (e.g., `123456789012345`)
   - **API Secret** (click "Reveal" to see it)

## Step 2: Update Your `.env` File

Copy these values to your `.env` file:

```env
VITE_CLOUDINARY_CLOUD_NAME=your_cloud_name_here
VITE_CLOUDINARY_API_KEY=your_api_key_here
VITE_CLOUDINARY_API_SECRET=your_api_secret_here
```

**Example:**
```env
VITE_CLOUDINARY_CLOUD_NAME=dxyz123abc
VITE_CLOUDINARY_API_KEY=123456789012345
VITE_CLOUDINARY_API_SECRET=abcdefghijklmnopqrstuvwxyz123456
```

## Step 3: Enable Unsigned Uploads (IMPORTANT!)

Cloudinary requires an upload preset to accept uploads. You need to enable unsigned uploads:

### Option A: Use Default Preset (Quickest)
1. In Cloudinary Console, go to **Settings** → **Upload**
2. Scroll to **Upload presets** section
3. Look for a preset (or create one):
   - Click **Add upload preset**
   - **Preset name**: Leave blank or use `unsigned_default`
   - **Signing Mode**: Select **Unsigned** ⚠️ (Important!)
   - **Folder**: Leave blank or set to `avatars`
   - **Use filename or externally defined Public ID**: Check this
   - Click **Save**
4. Copy the **preset name** (if you see "ml_default", you're good to go)

### Option B: Create Custom Preset (Recommended)
1. In Cloudinary Console, go to **Settings** → **Upload**
2. Scroll down to **Upload presets**
3. Click **Add upload preset**
4. Configure:
   - **Preset name**: `portfolio_uploads` (remember this!)
   - **Signing Mode**: **Unsigned** ⚠️ (Critical - must be unsigned!)
   - **Folder**: `avatars` (optional)
   - Leave other settings as default
5. Click **Save**
6. Update the code to use your preset name

### Update Code With Your Preset Name:

If you created a custom preset, update `src/lib/cloudinary.ts` line ~70:

```typescript
// Change from:
formData.append('upload_preset', 'ml_default');

// To your preset name:
formData.append('upload_preset', 'portfolio_uploads');
```

## Step 4: Test It!

1. **Restart your dev server** (Vite needs restart for new env vars):
   ```bash
   npm run dev
   ```

2. Log in to your app
3. Go to **Edit Profile**
4. Click the camera icon to upload an avatar
5. Select an image and click **Save Changes**

## Upload Flow

Here's what happens when a user uploads an avatar:

```
1. User selects image → 
2. Image preview shows (local blob URL) → 
3. User clicks "Save Changes" → 
4. Image uploads to Cloudinary → 
5. Cloudinary returns secure URL → 
6. URL saves to Firestore user document → 
7. URL updates Firebase Auth profile → 
8. Avatar displays everywhere
```

## Troubleshooting

### Error: "Cloudinary cloud name is not configured"
- Make sure `VITE_CLOUDINARY_CLOUD_NAME` is set in `.env`
- Restart your dev server after adding env vars

### Error: "Upload preset not found"
- Make sure the preset name in code matches your Cloudinary preset
- Check if the preset exists in **Settings → Upload → Upload presets**

### Error: "Invalid signature"
- For signed uploads, you need a backend to generate signatures
- Consider using unsigned presets for simpler setup

### Images not showing
- Check if the returned URL is valid (should start with `https://res.cloudinary.com/`)
- Verify your Cloudinary images are set to **Public** access mode
- Check browser console for CORS errors

## Security Notes

⚠️ **For Production:**

1. **API Secret**: Never expose `VITE_CLOUDINARY_API_SECRET` in frontend code
   - Remove it from `.env` or don't use it in frontend
   - Only use it server-side for signed uploads

2. **Upload Presets**: 
   - Use **Signed** mode for production
   - Restrict file types and sizes in preset settings
   - Set up server-side signature generation

3. **Rate Limiting**: 
   - Implement rate limiting on uploads
   - Consider using Cloudinary's upload moderation

## Benefits of Cloudinary

✅ **Automatic image optimization** (WebP, compression)
✅ **Face detection** for smart cropping
✅ **CDN delivery** for fast loading worldwide
✅ **No Firebase Storage costs**
✅ **Advanced transformations** (blur, filters, etc.)
✅ **Generous free tier** (25 GB storage, 25 GB bandwidth/month)

## Resources

- [Cloudinary Upload API](https://cloudinary.com/documentation/image_upload_api_reference)
- [Upload Presets](https://cloudinary.com/documentation/upload_presets)
- [Image Transformations](https://cloudinary.com/documentation/image_transformations)
- [React Integration](https://cloudinary.com/documentation/react_integration)
