import { Anchor, Breadcrumbs } from "@mantine/core"

const Header = () => {
  const items = [
    {
      label: 'Trang chủ',
      href: '/'
    },
    {
      label: 'Tạo bài thuốc',
      href: '/bai-thuoc'
    },
    {
      label: 'Tạo vị thuốc',
      href: '/vi-thuoc'
    }
  ].map((item, index) => (
    <Anchor href={item.href} key={index}>
      {item.label}
    </Anchor>
  ))
  return (
    <Breadcrumbs className="h-10 mt-3 ml-4">
      {items}    
    </Breadcrumbs>
  )
}

export default Header;