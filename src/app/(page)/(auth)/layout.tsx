export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // 背景画像
    <div
      className="min-h-screen text-gray-500 flex items-center justify-center"
      style={{
        WebkitTapHighlightColor: "transparent",
        backgroundImage: "url('/images/background-image_sea.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="w-full max-w-md">
        <div className="shadow-xl rounded-xl max-w-md bg-white/30 backdrop-blur-xl mx-4">
          {children}
        </div>
      </div>
    </div>
  );
}
