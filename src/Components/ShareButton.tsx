import React, { useState } from 'react';
import { 
  Box, 
  IconButton, 
  Popover, 
  PopoverTrigger, 
  PopoverContent, 
  PopoverBody, 
  Tooltip,
  useToast
} from '@chakra-ui/react';
import { 
  FaShareAlt, 
  FaTwitter, 
  FaWhatsapp, 
  FaEnvelope, 
  FaInstagram,
  FaLinkedin,
  FaFacebook,
  FaCopy
} from 'react-icons/fa';

interface ShareButtonProps {
  code: string;
  editorRef: any; // Monaco editor reference
}

const ShareButton: React.FC<ShareButtonProps> = ({ code, editorRef }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toast = useToast();

  const handleShare = (platform: string) => {
    // Get the code to share
    const textToShare = code || '';
    const encodedText = encodeURIComponent(textToShare);
    const subject = encodeURIComponent('Check out my code');
    
    let url = '';

    switch (platform) {
      case 'twitter':
        url = `https://twitter.com/intent/tweet?text=${subject}&url=${encodedText}`;
        break;
      case 'whatsapp':
        url = `https://api.whatsapp.com/send?text=${subject}: ${encodedText}`;
        break;
      case 'email':
        url = `mailto:?subject=${subject}&body=${encodedText}`;
        break;
      case 'linkedin':
        url = `https://www.linkedin.com/shareArticle?mini=true&url=${window.location.href}&title=${subject}&summary=${encodedText}`;
        break;
      case 'facebook':
        url = `https://www.facebook.com/sharer/sharer.php?u=${window.location.href}&quote=${encodedText}`;
        break;
      case 'copy':
        navigator.clipboard.writeText(textToShare).then(() => {
          toast({
            title: "Code copied to clipboard",
            status: "success",
            duration: 2000,
            isClosable: true,
            position: "top",
          });
        });
        break;
      case 'native':
        if (navigator.share) {
          navigator.share({
            title: 'Check out my code',
            text: textToShare,
          }).catch((error) => console.log('Error sharing', error));
        }
        break;
    }

    if (url && platform !== 'copy') {
      window.open(url, '_blank');
    }

    setIsOpen(false);
  };

  return (
    <Box 
      position="absolute" 
      top="8px" 
      right="8px" 
      zIndex="10"
      className="editor-share-button"
    >
      <Popover
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        placement="bottom-end"
        closeOnBlur={true}
      >
        <PopoverTrigger>
          <IconButton
            aria-label="Share code"
            icon={<FaShareAlt />}
            size="sm"
            onClick={() => setIsOpen(!isOpen)}
            backgroundColor="#444444"
            border="2px solid #000000"
            borderRadius="5px"
            color="#FFFFFF"
            boxShadow="5px 5px 0px 0px rgba(0, 0, 0, 1)"
            transition="all 0.2s ease"
            _hover={{
              transform: "translateY(2px)",
              boxShadow: "0px 0px 0px 0px rgba(0, 0, 0, 1)"
            }}
          />
        </PopoverTrigger>
        <PopoverContent 
          width="auto" 
          backgroundColor="#444444"
          border="2px solid #000000"
          borderRadius="5px"
          boxShadow="5px 5px 0px 0px rgba(0, 0, 0, 1)"
        >
          <PopoverBody display="flex" gap="2">
            <Tooltip label="Twitter" placement="top">
              <IconButton
                aria-label="Share on Twitter"
                icon={<FaTwitter />}
                size="sm"
                onClick={() => handleShare('twitter')}
                backgroundColor="#1DA1F2"
                color="white"
                _hover={{ backgroundColor: "#0d8fd9" }}
              />
            </Tooltip>
            <Tooltip label="WhatsApp" placement="top">
              <IconButton
                aria-label="Share on WhatsApp"
                icon={<FaWhatsapp />}
                size="sm"
                onClick={() => handleShare('whatsapp')}
                backgroundColor="#25D366"
                color="white"
                _hover={{ backgroundColor: "#1da652" }}
              />
            </Tooltip>
            <Tooltip label="Email" placement="top">
              <IconButton
                aria-label="Share via Email"
                icon={<FaEnvelope />}
                size="sm"
                onClick={() => handleShare('email')}
                backgroundColor="#DB4437"
                color="white"
                _hover={{ backgroundColor: "#c13828" }}
              />
            </Tooltip>
            <Tooltip label="LinkedIn" placement="top">
              <IconButton
                aria-label="Share on LinkedIn"
                icon={<FaLinkedin />}
                size="sm"
                onClick={() => handleShare('linkedin')}
                backgroundColor="#0077B5"
                color="white"
                _hover={{ backgroundColor: "#00669c" }}
              />
            </Tooltip>
            <Tooltip label="Facebook" placement="top">
              <IconButton
                aria-label="Share on Facebook"
                icon={<FaFacebook />}
                size="sm"
                onClick={() => handleShare('facebook')}
                backgroundColor="#4267B2"
                color="white"
                _hover={{ backgroundColor: "#385898" }}
              />
            </Tooltip>
            <Tooltip label="Copy Code" placement="top">
              <IconButton
                aria-label="Copy Code"
                icon={<FaCopy />}
                size="sm"
                onClick={() => handleShare('copy')}
                backgroundColor="#6E6E6E"
                color="white"
                _hover={{ backgroundColor: "#5a5a5a" }}
              />
            </Tooltip>
            {navigator.share && (
              <Tooltip label="Native Share" placement="top">
                <IconButton
                  aria-label="Native Share"
                  icon={<FaShareAlt />}
                  size="sm"
                  onClick={() => handleShare('native')}
                  backgroundColor="#FF7900"
                  color="white"
                  _hover={{ backgroundColor: "#e66d00" }}
                />
              </Tooltip>
            )}
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </Box>
  );
};

export default ShareButton;