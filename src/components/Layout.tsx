import Header from "./Header"

const Layout = ({children}: any) => {
  return (
    <main>
      <Header />
      {children}
    </main>
  )
}

export default Layout;