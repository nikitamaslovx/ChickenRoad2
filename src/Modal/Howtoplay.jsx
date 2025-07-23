const HowToPlayModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    // <div className="fixed top-0 left-0 w-full h-full z-50 flex items-center justify-center bg-blur bg-opacity-40 backdrop-blur-sm">
    <div className="fixed top-0 bg-black/60 left-0 w-full h-full z-50 flex items-center justify-center ">
      <div className="bg-[#393c52] text-white w-80 z-100 p-6 rounded-xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white text-xl cursor-pointer"
        >
          &times;
        </button>
        <h2 className="text-xl font-bold mb-4">How to play?</h2>
        <ol className="text-sm list-decimal list-inside space-y-2">
          <li>Specify the amount of your bet.</li>
          <li>
            Choose a difficulty level:
            <ul className="mt-2 ml-4 list-disc text-sm text-gray-300 space-y-1">
              <li>
                <strong>Easy</strong> – 24 lines
              </li>
              <li>
                <strong>Medium</strong> – 22 lines
              </li>
              <li>
                <strong>Hard</strong> – 20 lines
              </li>
              <li>
                <strong>Hardcore</strong> – 15 lines
              </li>
            </ul>
          </li>
          <li>Press the “Play” button.</li>
          <li>Try to pass as many lines as possible without getting fried.</li>
          <li>You can use the "Space" key to move forward if enabled.</li>
        </ol>
      </div>
    </div>
  );
};

export default HowToPlayModal;
