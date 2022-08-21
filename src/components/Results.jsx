import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ReactPlayer from 'react-player';

import { useResultContext } from '../context/ResultContextProvider';
import Rings from './Loading';

function Results() {
  const { getResults, results: { results, image_results, entries: newsEntries}, searchTerm, setSearchTerm, isLoading } = useResultContext();
  const location = useLocation();

  useEffect(() => {
    if(searchTerm) {
      if(location.pathname ==='/videos') {
        getResults(`/video/q=${searchTerm}&num=40`);
      } else if(location.pathname === '/images') {
        getResults(`/image/q=${searchTerm}&num=40`);
      }
      else {
        getResults(`${location.pathname}/q=${searchTerm}&num=40`)
      }
    }
   
  }, [searchTerm, location.pathname]);
  

  console.log(results);

  if(isLoading) return <Rings />
  // console.log(location.pathname);

  switch (location.pathname) {
    case '/search':
      return (
        <div className="flex flex-wrap justify-around space-y-6 sm:px-56 md:px-40">
          {results?.map(({ link, title, description}, index) => (
            <div key={index} className="md:w-2/5 w-full">
              <a href={link} target="_blank">
                <p className="text-sm">
                  {link.length > 30 ? link.substring(0, 30) : link}
                </p>
                <p className="text-lg hover:underline dark:text-blue-300 text-blue-700">{title}</p>
                <p className="text-sm text-gray-500">
                  {description}
                </p>
              </a>
            </div>
          ))}
        </div>
      );
    case '/images':
      return (
        <div className="flex flex-wrap justify-center items-center">
          {image_results?.map(({ image, link: { href, title }}, index) =>(
            <a href={href} key={index} target="_blank" className="sm:p-3 p-5">
              <img src={image.src} alt={title} loading='lazy' className='h-40 w-40' />
              <p className="w-36 break-words p-4">
                {title}
              </p>
            </a>
          ))}
        </div>
      );
    case '/news':
      return (
        <div className="flex flex-wrap justify-between space-y-6 sm:px-56 md:px-40 items-center">
          {newsEntries?.map(({ links, id, source, title}) => (
            <div key={id} className="md:w-2/5 w-full">
              <a href={links?.[0].href} target="_blank" className='hover:underline'>
                <p className="text-lg dark:text-blue-300 text-blue-700">{title}</p>
                <div className="flex gap-4">
                  <a href={source?.href} target="_blank">
                    {source?.href}
                  </a>
                </div>
              </a>
            </div>
          ))}
        </div>
      );
    case '/videos':
      return  (
        <div className="flex flex-wrap justify-center items-center">
          {results?.map((video, index) => (
            <div key={index} className="p-4">
              <ReactPlayer url={video.additional_links?.[0].href} controls width='355px' height='200px' loading='lazy'/>
            </div>
          ))}
        </div>
      );

    default:
      return 'Error';
  }
}

export default Results