export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div
      style={{
        WebkitTapHighlightColor: "transparent",
        backgroundImage: "url('/images/background-image_purple.png')",
        // backgroundSize: "cover",
        backgroundPosition: "center",
        // backgroundRepeat: "no-repeat",
      }}
    >
      {children}
    </div>
  );
}
