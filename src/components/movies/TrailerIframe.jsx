import ReactPlayer from 'react-youtube';

const TrailerIframe = ({ videoId }) => {
  if (!videoId) return null;

  const opts = {
    height: '100%',
    width: '100%',
    playerVars: {
      autoplay: 0,
      rel: 0,
      modestbranding: 1,
    },
  };

  return (
    <div className="w-full aspect-video bg-black rounded-2xl overflow-hidden shadow-[0_0_30px_rgba(0,0,0,0.5)] border border-dark-700">
      <ReactPlayer 
        videoId={videoId} 
        opts={opts} 
        className="w-full h-full"
        iframeClassName="w-full h-full"
      />
    </div>
  );
};

export default TrailerIframe;
