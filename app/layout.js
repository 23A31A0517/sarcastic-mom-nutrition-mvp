import "./globals.css";

export const metadata = {
  title: "Sarcastic Mom Nutrition Advisor",
  description: "Log your meal. Get judged lovingly."
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-100 text-gray-900">
        {children}
      </body>
    </html>
  );
}
