import React, { useState } from 'react';
import { ChannelList, useChatContext } from 'stream-chat-react';
import { ChannelSearch, TeamChannelList, TeamChannelPreview } from './';


const customChannelTeamFilter = (channels) => {
  return channels.filter((channel) => channel.type === 'team');
}

const customChannelMessagingFilter = (channels) => {
  return channels.filter((channel) => channel.type === 'messaging');
}

const ChannelListContent = ({ isCreating, setIsCreating, setCreateType, setIsEditing, setToggleContainer,color }) => {
  const { client } = useChatContext();

  const filters = { members: { $in: [client.userID] } };
  return (
    <>
    {console.log(color)}
        <div className="channel-list__list__wrapper"  style={{backgroundColor: color}}>
          <ChannelSearch/>
          <ChannelList
              filters={filters}
              channelRenderFilterFn={customChannelTeamFilter}
              List={(listprops) => (
                  <TeamChannelList 
                    {...listprops}
                    type="team"
                    isCreating={isCreating}
                    setIsCreating={setIsCreating}
                    setCreateType={setCreateType} 
                    setIsEditing={setIsEditing}
                    setToggleContainer={setToggleContainer}
                  />
              )}
              Preview={(previewProps) => (
                <TeamChannelPreview 
                    {...previewProps}
                    type="team"
                    setIsCreating={setIsCreating}
                    setIsEditing={setIsEditing}
                    setToggleContainer={setToggleContainer}
                />
            )}
          />

          <ChannelList
              filters={filters}
              channelRenderFilterFn={customChannelMessagingFilter}
              List={(listprops) => (
                  <TeamChannelList 
                    {...listprops}
                    type="messaging"
                    isCreating={isCreating}
                    setIsCreating={setIsCreating}
                    setCreateType={setCreateType} 
                    setIsEditing={setIsEditing}
                    setToggleContainer={setToggleContainer}
                  />
              )}
              Preview={(previewProps) => (
                <TeamChannelPreview 
                    {...previewProps}
                    type="messaging"
                    setIsCreating={setIsCreating}
                    setIsEditing={setIsEditing}
                    setToggleContainer={setToggleContainer}
                />
            )}
          />
        </div>
    </>
  );
}

const ChannelListContainer = ({ setCreateType, setIsCreating, setIsEditing, color }) => {
  const [toggleContainer, setToggleContainer] = useState(false);

  return (
      <>
          <div className="channel-list__container" >
            <ChannelListContent 
              setIsCreating={setIsCreating} 
              setCreateType={setCreateType} 
              setIsEditing={setIsEditing}
              color={color}
            />
          </div>

          <div className="channel-list__container-responsive"
              style={{ left: toggleContainer ? "0%" : "-89%", backgroundColor: "#005fff"}}
          >
              <div className="channel-list__container-toggle" onClick={() => setToggleContainer((prevToggleContainer) => !prevToggleContainer)}>
              </div>
            <ChannelListContent 
                setIsCreating={setIsCreating} 
                setCreateType={setCreateType} 
                setIsEditing={setIsEditing}
                setToggleContainer={setToggleContainer}
                color={color}
            />
          </div>
      </>
  )

}

export default ChannelListContainer;