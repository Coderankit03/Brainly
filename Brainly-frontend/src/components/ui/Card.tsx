import { useEffect } from "react";
import ShareIcon from "../../icons/ShareIcon";

interface CardProps {
  title: string,
  link: string,
  type: "Twitter" | "Youtube"
}

const Card = ({title,link,type}: CardProps) => {

  const getYouTubeEmbedUrl = (url) => {
    const videoId = url.split("v=")[1]?.split("&")[0];
    return `https://www.youtube.com/embed/${videoId}`;
  };
  
  if (type === "Twitter") {
    // Load Twitter script only once per render
    const scriptExists = document.querySelector('script[src="https://platform.twitter.com/widgets.js"]');
    if (!scriptExists) {
      const script = document.createElement("script");
      script.setAttribute("src", "https://platform.twitter.com/widgets.js");
      script.setAttribute("async", "true");
      document.body.appendChild(script);
    }
  }

  return (  
    <div className="p-10 shadow-md outline-slate-300 bg-white rounded-md max-w-64 mt-4">
      <div className="flex justify-between">
        <div className="flex items-center">
          <ShareIcon size="md" />
          <div className="ml-3 font-semibold">
          {type}
          </div>
        </div>
        <div className="flex items-center">
          <div>
            <a href={link} target="_blank">
            <ShareIcon size="md" />
            </a>
          </div>
          <ShareIcon size="md " />
        </div>
      </div>
      <div className="mt-2 font-semibold">
      {title}
      </div>
      <div className="mt-4">


{type === "Youtube" && (
        <iframe
          className="w-full"
          src={getYouTubeEmbedUrl(link)}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
      )}

      {type === "Twitter" && <blockquote className="twitter-tweet">
  <a href={link}></a> 
</blockquote>
      }
      </div>
    </div>
  );
};

export default Card;
