import Header from "./Header"

const Layout = ({children}: any) => {
  return (
    <main className="min-h-screen background-layout">
      <Header />
      {children}
    </main>
  )
}

export default Layout;