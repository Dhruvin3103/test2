import { GetStaticProps, InferGetStaticPropsType } from "next";
import { getHeaderRes, getFooterRes, getAllEntries } from "../../../helper";
import { useState } from "react";
import {
  Key,
  ReactElement,
  JSXElementConstructor,
  ReactFragment,
  ReactPortal,
} from "react";
import Link from "next/link";
import Image from "next/image";
import { CiCirclePlus } from "react-icons/ci";
import { FaEdit, FaEye, FaTrashAlt } from "react-icons/fa";

interface Page {
  uid: string;
  title: string;
  url: string;
}

interface PagesPageProps {
  pages: Page[];
  header: any;
  footer: any;
}

export const getStaticProps: GetStaticProps<PagesPageProps> = async () => {
  try {
    const pages = await getAllEntries();
    const header = await getHeaderRes();
    const footer = await getFooterRes();

    return {
      props: { pages, header, footer },
    };
  } catch (error) {
    console.error("Error fetching pages:", error);
    return {
      props: { pages: [], header: null, footer: null },
    };
  }
};

const PagesPage = ({
  pages,
  header,
  footer,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const toggleDropdown = (uid: string) => {
    setOpenDropdown((prev) => (prev === uid ? null : uid));
  };


  const handleClick = (action: string) => {
    console.log(`${action} button clicked`);
  };

  return (
    <div className="bg-slate-200">
      {/* Header */}
      <div className="mb-4 pt-5">
        <div className="bg-gradient-to-tr from-[#A594F9] to-[#6247AA] text-3xl leading-6 p-2 font-serif font-normal px-4 text-white rounded-xl ml-5 ">
          HEADER
        </div>

        <div className="pt-4 mx-4 flex flex-col md:flex-row gap-8">
          {/* Image with Hover and Light Background */}
          <div
            className="relative flex flex-col items-center border border-gray-300 rounded-3xl px-4 pt-14 bg-gray-100 
                 transition-transform transform hover:scale-105 hover:shadow-lg cursor-pointer"
          >
            <Image
              src="/box.png"
              alt="box"
              width={400}
              height={250}
              className="rounded-3xl"
            />
            
            <div className="absolute top-2 right-2 flex space-x-2 ">
              <span className="text-2xl font-semibold font-serif mr-44 mt-1 text-[#6247AA]">Header</span>
              <button className="p-1 rounded-full hover:bg-gray-300" onClick={()=>handleClick("EDIT")}><FaEdit size={30}/></button>
              <button className="p-1 bg-gray-200 rounded-full hover:bg-gray-300" onClick={()=>handleClick("EDIT")}><FaEye size={30}/></button>
              <button className="p-1 bg-gray-200 rounded-full hover:bg-gray-300" onClick={()=>handleClick("EDIT")}><FaTrashAlt size={30}/></button>
            </div>

          </div>

          {/* Customization Section with Hover Effect */}
          <div
            className="relative w-[450px] h-[320px] border border-4 rounded-3xl bg-gray-100 group 
                 transition-transform transform hover:scale-105 hover:shadow-lg cursor-pointer"
          > 
            <CiCirclePlus className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-8xl" />
            <div className="font-serif absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white text-2xl font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
              <span className="mt-28">Customize your own</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-4 pt-5">
        <div className="bg-gradient-to-tr from-[#A594F9] to-[#6247AA] text-3xl leading-6 p-2 font-serif font-normal px-4 text-white rounded-xl ml-5">
          PAGES
        </div>

        {pages.length === 0 ? (
          <p>No pages available.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-8 p-4">
            {pages.map((page) => (
              <Link key={page.uid} href={`/playground/page/${page.uid}`}>

                {/* yeh edit karna h  */}
                <div
                  className="relative flex flex-col items-center border border-gray-300 rounded-3xl pb-3 pt-14 bg-gray-100
                       transition-transform transform hover:scale-105 hover:shadow-lg cursor-pointer"
                >
                  {/* <h3 className="mb-2 text-xl font-semibold text-center">
                    {page.title}
                  </h3> */}
                  <Image
                    src="/box.png"
                    alt="box"
                    width={400}
                    height={250}
                    className="rounded-3xl"
                  />
                  <div className="absolute top-2 right-16 flex space-x-2 ">
              <span className="text-2xl font-semibold font-serif mt-1 mr-20 text-[#6247AA]">{page.title}</span>
              <button className="p-1 rounded-full hover:bg-gray-300" onClick={()=>handleClick("EDIT")}><FaEdit size={30}/></button>
              <button className="p-1 rounded-full hover:bg-gray-300" onClick={()=>handleClick("EDIT")}><FaEye size={30}/></button>
              <button className="p-1 rounded-full hover:bg-gray-300" onClick={()=>handleClick("EDIT")}><FaTrashAlt size={30}/></button>
            </div>
                </div>
              </Link>
            ))}

            <div
              className="relative w-full h-[310px] border border-4 rounded-3xl bg-gray-100 group 
                   transition-transform transform hover:scale-105 hover:shadow-lg cursor-pointer"
            >
              <CiCirclePlus className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-8xl" />
              <div className="font-serif absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white text-2xl font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="mt-28">Customize your own</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* footer */}
      <div className="mb-4 ">
        <div className="bg-gradient-to-tr from-[#A594F9] to-[#6247AA] text-3xl leading-6 p-2 font-serif font-normal px-4 text-white rounded-xl ml-5">
          FOOTER
        </div>

        <div className="pt-4 mx-4 flex flex-col md:flex-row gap-8">
          {/* Image with Hover and Light Background */}
          <div
            className="flex flex-col items-center border border-gray-300 rounded-lg p-4 bg-gray-100 
                 transition-transform transform hover:scale-105 hover:shadow-lg cursor-pointer"
          >
            <Image
              src="/box.png"
              alt="box"
              width={400}
              height={250}
              className="rounded-3xl"
            />
          </div>

          {/* Customization Section with Hover Effect */}
          <div
            className="relative w-[400px] h-[300px] border border-4 rounded-3xl bg-gray-100 group 
                 transition-transform transform hover:scale-105 hover:shadow-lg cursor-pointer"
          >
            <CiCirclePlus className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-8xl" />
            <div className="font-serif absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white text-2xl font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
              <span className="mt-28">Customize your own</span>
            </div>
          </div>
        </div>
      </div>


    </div>
  );
};

export default PagesPage;
