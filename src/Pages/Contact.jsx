import { Input, Textarea } from "@material-tailwind/react";
import { TelegramLogo } from "@phosphor-icons/react";

const Contact = () => {
    return (
        <div className="mx-24 px-16 py-12">
            <h1 className="text-3xl font-bold text-center mb-10">
                Liên hệ với chúng tôi
            </h1>
            <div className="flex gap-12">
                <div className="flex-1 flex flex-col gap-7">
                    <h2 className="text-xl font-semibold">
                        Bạn có thể ghé lại bất cứ chi nhánh nào của chúng tôi để
                        có thể trao đổi trực tiếp. Chúng tôi luôn sẵn sàng đón
                        tiếp !
                    </h2>
                    <div className="grid grid-cols-2 gap-0">
                        <span className="col-span-1 font-bold text-[#fa8232]">
                            ĐỊA CHỈ
                        </span>
                        <p className="col-span-1">
                            Trường ĐH Bách Khoa - ĐHQG TP.HCM CS1: 268 Lý Thường
                            Kiệt, Q.10, TP.HCM CS2: Đông Hòa, Dĩ An, Bình Dương
                        </p>
                    </div>

                    <hr class="col-span-2 h-px my-4 bg-gray-200 border-0 dark:bg-gray-700"></hr>

                    <div className="grid grid-cols-2 gap-0">
                        <span className="col-span-1 font-bold text-[#fa8232]">
                            ĐIỆN THOẠI
                        </span>
                        <p className="col-span-1">
                            (+84)01234567890 <br />
                            (+028)555-123354
                        </p>
                    </div>

                    <hr class="col-span-2 h-px my-4 bg-gray-200 border-0 dark:bg-gray-700"></hr>

                    <div className="grid grid-cols-2 gap-0">
                        <span className="col-span-1 font-bold text-[#fa8232]">
                            ĐỊA CHỈ EMAIL
                        </span>
                        <p className="col-span-1">
                            <a href="mailto:vnu2hand@gmail.com">
                                vnu2hand@gmail.com <br />
                                vnu2hand@hcmut.edu.vn
                            </a>
                        </p>
                    </div>
                </div>

                <form className="flex-1 flex flex-col gap-4 bg-gray-200 px-10 py-10 rounded-lg">
                    <h3 className="text-xl font-semibold">Get In Touch</h3>

                    <p className="text-gray-600 mb-8">
                        Feel free contact with us, we love to make new partners
                        & friends
                    </p>

                    <div className="grid grid-cols-2 gap-10 mb-5">
                        <Input
                            label="Họ"
                            className="col-span-4 bg-white"
                            size="lg"
                        />
                        <Input
                            label="Tên"
                            className="col-span-4 bg-white"
                            size="lg"
                        />
                    </div>

                    <div className="grid grid-cols-1 gap-10 mb-5">
                        <Input
                            label="Email"
                            className="col-span-4 bg-white"
                            size="lg"
                        />
                    </div>

                    <div className="grid grid-cols-1 gap-10 mb-5">
                        <Input
                            label="Subject"
                            className="col-span-4 bg-white"
                            size="lg"
                        />
                    </div>

                    <div className="grid grid-cols-1 gap-10 mb-5">
                        <Textarea
                            label="Message"
                            className="col-span-4 bg-white"
                            size="lg"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-10 mb-5">
                        <button className="bg-[#fa8232] text-white rounded-lg py-3 flex justify-center items-center gap-2">
                            Send message
                            <TelegramLogo size={24}/>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
export default Contact;
