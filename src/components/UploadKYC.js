import React, { useState } from 'react';
import { getAuth } from 'firebase/auth';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const UploadKYC = () => {
  const [selfie, setSelfie] = useState(null);
  const [aadharCard, setAadharCard] = useState(null);
  const [panCard, setPanCard] = useState(null);
  const [addressProof, setAddressProof] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  const auth = getAuth();
  const userId = auth.currentUser ? auth.currentUser.uid : null; // Get current user's UID
  const storage = getStorage();

  const handleUpload = async (file, type) => {
    if (!userId) {
      alert("User not logged in.");
      return;
    }

    const storageRef = ref(storage, `kyc/${userId}/${type}/${file.name}`);
    
    try {
      setUploading(true);
      await uploadBytes(storageRef, file);
      const fileUrl = await getDownloadURL(storageRef);
      console.log(`${type} uploaded successfully: ${fileUrl}`);
      return fileUrl; // Return the file URL if needed
    } catch (error) {
      console.error("Error uploading KYC documents:", error);
      setError("Error uploading KYC documents.");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (selfie) await handleUpload(selfie, 'selfie');
      if (aadharCard) await handleUpload(aadharCard, 'aadhar');
      if (panCard) await handleUpload(panCard, 'pan');
      if (addressProof) await handleUpload(addressProof, 'address');
      alert('KYC documents uploaded successfully!');
    } catch (error) {
      console.error("Error in handleSubmit:", error);
      setError("Error in submitting KYC documents.");
    }
  };

  return (
    <div>
      <h2>Upload KYC Documents</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Selfie:
            <input type="file" accept="image/*" onChange={(e) => setSelfie(e.target.files[0])} />
          </label>
        </div>
        <div>
          <label>
            Aadhar Card:
            <input type="file" accept="image/*" onChange={(e) => setAadharCard(e.target.files[0])} />
          </label>
        </div>
        <div>
          <label>
            PAN Card:
            <input type="file" accept="image/*" onChange={(e) => setPanCard(e.target.files[0])} />
          </label>
        </div>
        <div>
          <label>
            Address Proof:
            <input type="file" accept="image/*" onChange={(e) => setAddressProof(e.target.files[0])} />
          </label>
        </div>
        <button type="submit" disabled={uploading}>
          {uploading ? 'Uploading...' : 'Upload KYC'}
        </button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </div>
  );
};

export default UploadKYC;
