export default function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center min-h-screen -mt-20 md:mt-0">
      <div className="flex space-x-1">
        <div className="w-4 h-4 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full animate-bounce"></div>
        <div
          className="w-4 h-4 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full animate-bounce"
          style={{ animationDelay: "0.1s" }}
        ></div>
        <div
          className="w-4 h-4 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full animate-bounce"
          style={{ animationDelay: "0.2s" }}
        ></div>
      </div>
    </div>
  );
}
