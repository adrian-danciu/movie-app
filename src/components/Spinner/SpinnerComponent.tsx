const SpinnerComponent = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-background bg-opacity-100 z-50">
      <div className="w-16 h-16 border-4 border-gray-300 border-t-4 border-t-accent rounded-full animate-spin"></div>
    </div>
  );
};

export default SpinnerComponent;
