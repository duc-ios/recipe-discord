import path from 'path';

module.exports = (Franz) => {
  const getMessages = function getMessages() {
    const direct = document.querySelector('[class*="guilds-"]').querySelectorAll('[class^="numberBadge-"]').length;
    
    var indirect = 0;
    var guilds = document.querySelector("[data-list-id=guildsnav]");
    if (guilds != null) {
      var channelPills = [].slice.call(guilds.querySelectorAll("[class*=item-2hkk8m]"));
      indirect += channelPills.filter(y => y.clientHeight == 8).length;
      
      var activeWindow = channelPills.find(y => y.clientHeight == 40);
      if(activeWindow != null) {
        var unreadChannels = document.querySelector("[class*=modeUnread]");
        
        if(unreadChannels != null)
          indirect++;
      }
    }
    
    Franz.setBadge(direct, indirect);
  };

  // check for new messages every second and update Franz badge
  Franz.loop(getMessages);

  // Hide download message
  Franz.injectCSS(path.join(__dirname, 'service.css'));

  // Support theme
  Franz.injectCSS(path.join(__dirname, 'theme.css'));
};
