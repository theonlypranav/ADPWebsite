import React from 'react';
import { useNavigate } from 'react-router-dom';

const Slideshow = () => {
  const navigate = useNavigate();

  const handleSlideshow = () => {
    navigate('/slideshow');
  };

  return (
    <div className="slideshow p-4 bg-custom-light-bg text-custom-light-text dark:bg-custom-dark-bg dark:text-custom-dark-text">
      {/* Title */}
      <h1 className="text-4xl font-bold text-center mb-6">Oasis</h1>

      {/* Table */}
      <table className="w-full border-collapse border border-custom-border">
        <thead>
          <tr>
            <th className="border border-custom-border p-2">Column 1</th>
            <th className="border border-custom-border p-2">Column 2</th>
            <th className="border border-custom-border p-2">Column 3</th>
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: 3 }).map((_, rowIndex) => (
            <tr key={rowIndex}>
              <td className="border border-custom-border p-2">Row {rowIndex + 1}, Col 1</td>
              <td className="border border-custom-border p-2">Row {rowIndex + 1}, Col 2</td>
              <td className="border border-custom-border p-2">Row {rowIndex + 1}, Col 3</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Button */}
      <button 
        className='absolute top-4 right-4 bg-silver-700 text-white py-2 px-4 rounded hover:bg-silver-500 transition duration-300'
        onClick={handleSlideshow}
      >
        Slideshow
      </button>
    </div>
  );
};

export default Slideshow;






// import React from 'react';

// // Create a context to dynamically load all images from the folder
// const importAll = (r) => {
//     let images = {};
//     r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
//     return images;
// };

// // Import all images from the assets/fest1 folder
// const images = importAll(require.context('../assets/fest1', false, /\.(jpg|jpeg|png)$/));

// const Slideshow = () => {
//     // Convert image object keys to an array for mapping
//     const photoArray = Object.values(images);

//     return (
//         <div className="slideshow">
//             {photoArray.map((photo, index) => (
//                 <img key={index} src={photo} alt={`Photo ${index + 1}`} />
//             ))}
//         </div>
//     );
// };

// export default Slideshow;
