/**
 * Cloudinary Upload Utility
 * Handles image uploads to Cloudinary and returns secure URLs
 */

const CLOUDINARY_CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const CLOUDINARY_API_KEY = import.meta.env.VITE_CLOUDINARY_API_KEY;
const CLOUDINARY_API_SECRET = import.meta.env.VITE_CLOUDINARY_API_SECRET;

if (!CLOUDINARY_CLOUD_NAME) {
  console.warn('⚠️  VITE_CLOUDINARY_CLOUD_NAME is not set in .env');
}

/**
 * Upload an image to Cloudinary
 * @param file - The image file to upload
 * @param folder - Optional folder name in Cloudinary (e.g., 'devlink')
 * @returns Promise with the secure URL of the uploaded image
 */
export async function uploadToCloudinary(
  file: File,
  folder: string = 'devlink'
): Promise<string> {
  if (!CLOUDINARY_CLOUD_NAME) {
    throw new Error('Cloudinary cloud name is not configured');
  }

  // Create form data
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', 'ml_default'); // You can create a custom preset in Cloudinary dashboard
  formData.append('folder', folder);
  
  // Optional: Add API key for signed uploads (more secure)
  if (CLOUDINARY_API_KEY) {
    formData.append('api_key', CLOUDINARY_API_KEY);
  }

  try {
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
      {
        method: 'POST',
        body: formData,
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.error?.message || 'Failed to upload image to Cloudinary'
      );
    }

    const data = await response.json();
    return data.secure_url; // Returns the HTTPS URL of the uploaded image
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    throw new Error(
      error instanceof Error
        ? error.message
        : 'Failed to upload image. Please try again.'
    );
  }
}

/**
 * Upload an avatar image to Cloudinary using SIGNED uploads (no preset needed)
 * WARNING: This exposes API_SECRET in frontend code. 
 * In production, generate signatures server-side!
 */
export async function uploadAvatar(file: File, userId: string): Promise<string> {
  if (!CLOUDINARY_CLOUD_NAME) {
    throw new Error('Cloudinary cloud name is not configured. Add VITE_CLOUDINARY_CLOUD_NAME to your .env file');
  }

  if (!CLOUDINARY_API_KEY || !CLOUDINARY_API_SECRET) {
    throw new Error('Cloudinary API Key and Secret are required. Add them to your .env file');
  }

  // Validate file type
  if (!file.type.startsWith('image/')) {
    throw new Error('Please upload an image file (JPG, PNG, GIF, etc.)');
  }

  // Validate file size (max 2MB)
  const maxSize = 2 * 1024 * 1024; // 2MB
  if (file.size > maxSize) {
    throw new Error('Image size must be less than 2MB');
  }

  const timestamp = Math.round(Date.now() / 1000);
  const publicId = `user_${userId}_${timestamp}`;
  const folder = 'devlink';
  
  const formData = new FormData();
  formData.append('file', file);
  formData.append('api_key', CLOUDINARY_API_KEY);
  formData.append('timestamp', timestamp.toString());
  formData.append('folder', folder);
  formData.append('public_id', publicId);
  
  // For signed uploads, we can use eager transformations without a preset
  formData.append('eager', 'w_400,h_400,c_fill,g_face,q_auto,f_auto');
  
  // Generate signature (params must be in alphabetical order)
  const paramsToSign = {
    eager: 'w_400,h_400,c_fill,g_face,q_auto,f_auto',
    folder: folder,
    public_id: publicId,
    timestamp: timestamp,
  };
  
  // Create signature string manually (Cloudinary requires SHA-1 hash)
  // Since we can't do proper SHA-1 in browser easily, we'll use a workaround
  const signatureString = `eager=${paramsToSign.eager}&folder=${paramsToSign.folder}&public_id=${paramsToSign.public_id}&timestamp=${paramsToSign.timestamp}${CLOUDINARY_API_SECRET}`;
  
  // Use crypto-js or similar for proper SHA-1
  // For now, let's use a simpler approach with Web Crypto API
  const encoder = new TextEncoder();
  const data = encoder.encode(signatureString);
  
  try {
    // Generate SHA-1 signature
    const hashBuffer = await crypto.subtle.digest('SHA-1', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const signature = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    
    formData.append('signature', signature);
    
    const uploadUrl = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`;
    const response = await fetch(uploadUrl, {
      method: 'POST',
      body: formData,
    });

    if (response.ok) {
      const data = await response.json();
      console.log('✅ Signed upload successful!');
      
      // Return the eager transformed URL if available
      if (data.eager && data.eager.length > 0) {
        return data.eager[0].secure_url;
      }
      
      // Or build the transformed URL manually
      const transformedUrl = `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/upload/w_400,h_400,c_fill,g_face,q_auto,f_auto/v${data.version}/${data.public_id}.${data.format}`;
      return transformedUrl;
    } else {
      const errorData = await response.json();
      console.error('❌ Upload failed:', errorData);
      throw new Error(errorData.error?.message || 'Upload failed');
    }
  } catch (error) {
    console.error('Avatar upload error:', error);
    throw new Error(
      error instanceof Error
        ? error.message
        : 'Failed to upload avatar. Please try again.'
    );
  }
}

/**
 * Delete an image from Cloudinary (requires backend implementation for security)
 * This is a placeholder - in production, this should be done server-side
 */
export async function deleteFromCloudinary(_publicId: string): Promise<void> {
  console.warn('Delete operation should be implemented server-side for security');
  // In production, call your backend API endpoint that handles deletion
  // using Cloudinary Admin API with API_SECRET
  throw new Error('Delete operation not implemented');
}
