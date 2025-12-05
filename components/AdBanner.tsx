import React, { useEffect } from 'react';

const AdBanner: React.FC = () => {
  useEffect(() => {
    try {
      if (window.adsbygoogle) {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    } catch (e) {
      console.error("AdSense error", e);
    }
  }, []);

  return (
    <div className="w-full my-6 flex flex-col items-center justify-center overflow-hidden bg-gray-50 border border-gray-100 rounded-lg p-4">
       <span className="text-[10px] text-gray-400 uppercase tracking-widest mb-2">Advertisement</span>
       {/* Placeholder for dev since real ads won't show without valid pub ID and domain approval */}
       <div className="w-full h-32 bg-gray-100 border-2 border-dashed border-gray-200 rounded flex items-center justify-center text-gray-400 text-sm">
          Google AdSense Unit
          {/* 
            Replace client and slot with your actual AdSense data.
            <ins className="adsbygoogle"
              style={{ display: 'block' }}
              data-ad-client="ca-pub-XXXXXXXXXXXXXXXX" 
              data-ad-slot="XXXXXXXXXX"
              data-ad-format="auto"
              data-full-width-responsive="true"></ins>
          */}
       </div>
    </div>
  );
};

export default AdBanner;