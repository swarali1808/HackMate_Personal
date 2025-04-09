import React from 'react';
import { FiLink, FiPlus, FiExternalLink, FiEdit2 } from 'react-icons/fi';

const SocialLinksTab = ({ socialLinks, onOpenModal }) => {
  const hasLinks = Object.keys(socialLinks || {}).length > 0;
  
  const socialPlatforms = [
    { name: 'linkedin', label: 'LinkedIn', icon: 'https://cdn-icons-png.flaticon.com/512/174/174857.png', required: true },
    { name: 'github', label: 'GitHub', icon: 'https://github.githubassets.com/favicon.ico' },
    { name: 'portfolio', label: 'Portfolio', icon: 'https://cdn-icons-png.flaticon.com/512/1454/1454827.png' },
    { name: 'twitter', label: 'Twitter', icon: 'https://cdn-icons-png.flaticon.com/512/733/733579.png' },
    { name: 'devfolio', label: 'Devfolio', icon: 'https://devfolio.co/favicon.png' },
    { name: 'unstop', label: 'Unstop', icon: 'https://d8it4huxumps7.cloudfront.net/uploads/images/unstop/branding/unstop-icon.svg' }
  ];
  
  // Helper function to ensure valid URLs
  const ensureValidUrl = (url) => {
    if (!url) return '';
    if (url.match(/^https?:\/\//)) {
      return url;
    }
    return `https://${url}`;
  };
  
  // Helper function to truncate long URLs
  const truncateUrl = (url) => {
    if (!url) return '';
    const stripped = url.replace(/^(https?:\/\/)?(www\.)?/, '');
    return stripped.length > 30 ? stripped.substring(0, 30) + '...' : stripped;
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm mb-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold text-[#340062]">Social Links</h3>
        <button 
          type="button"
          onClick={() => onOpenModal('Social Links')}
          className="inline-flex items-center px-3 py-1 border border-[#340062] text-[#340062] rounded text-sm hover:bg-[#f6ebff] transition-colors"
        >
          {hasLinks ? <><FiEdit2 className="mr-1" /> Edit Links</> : <><FiPlus className="mr-1" /> Add Links</>}
        </button>
      </div>
      
      {!hasLinks ? (
        <div className="text-center py-6 border border-dashed border-[#b6cbff] rounded-lg">
          <p className="text-[#11014c] opacity-70">No social links added yet. Add your profiles to connect with others.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {socialPlatforms.map((platform) => (
            socialLinks[platform.name] ? (
              <div key={platform.name} className="flex items-center p-4 border border-[#b6cbff] rounded-lg">
                <img src={platform.icon} alt={platform.label} className="w-8 h-8 mr-3" />
                <div>
                  <p className="font-medium text-[#340062]">{platform.label}</p>
                  <a 
                    href={ensureValidUrl(socialLinks[platform.name])} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-sm text-[#11014c] hover:text-[#340062] hover:underline flex items-center"
                  >
                    {truncateUrl(socialLinks[platform.name])}
                    <FiExternalLink className="ml-1" size={14} />
                  </a>
                </div>
              </div>
            ) : null
          ))}
        </div>
      )}
    </div>
  );
};

export default SocialLinksTab;