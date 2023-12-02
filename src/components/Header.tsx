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
    <Breadcrumbs className="h-10 ml-4 pt-12 pb-6">
      {items}    
    </Breadcrumbs>
  )
}

export default Header;