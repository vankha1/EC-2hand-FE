import { Typography } from "@material-tailwind/react";

const LINKS = [
  {
    title: "THỂ LOẠI",
    items: ["Máy tính & Laptop", "Điện thoại", "Tai nghe", "Camera", "TV"],
  },
  {
    title: "ĐƯỜNG DẪN NHANH",
    items: [
      "Giỏ hàng",
      "Sản phẩm yêu thích",
      "Thông tin tài khoản",
      "Theo dõi đơn hàng",
      "CSKH",
    ],
  },
];

export default function Footer() {
  return (
    <footer className="relative w-full bg-[#191C1F] p-10">
      <div className="mx-auto w-full max-w-7xl px-8">
        <div className="grid grid-cols-1 justify-between gap-4 md:grid-cols-2 ">
          <div className="pl-56 flex flex-col">
            <div className="my-4 flex flex-row items-center gap-3">
              <img src="/logo.png" alt="VNU2Hand" className="h-12" />
              <div className="text-2xl text-white font-bold">VNU2HAND</div>
            </div>
            <Typography
              variant="small"
              color="gray"
              className="mb-3 font-medium opacity-40"
            >
              CSKH:
            </Typography>
            <Typography
              as="a"
              href="#"
              color="white"
              className="font-normal transition-colors hover:text-blue-gray-900"
            >
              01234567890
            </Typography>
            <Typography
              variant="small"
              color="gray"
              className="mb-3 font-medium opacity-40"
            >
              Đại học Bách khoa TP.HCM
            </Typography>
            <Typography
              as="a"
              href="#"
              color="white"
              className="font-normal transition-colors hover:text-blue-gray-900"
            >
              vnu2hand@gmail.com
            </Typography>
          </div>
          <div className="grid grid-cols-2 justify-between gap-4">
            {LINKS.map(({ title, items }) => (
              <ul key={title}>
                <Typography
                  variant="small"
                  color="white"
                  className="mb-3 font-medium opacity-90"
                >
                  {title}
                </Typography>
                {items.map((link) => (
                  <li key={link}>
                    <Typography
                      as="a"
                      href="#"
                      color="gray"
                      className="py-1.5 font-normal transition-colors hover:text-blue-gray-900"
                    >
                      {link}
                    </Typography>
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
