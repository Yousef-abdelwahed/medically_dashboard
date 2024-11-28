import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../../components/common/Sidebar";
import LogoutButton from "../../components/LogoutButton/LogoutButton";

const MasterLayout = () => {
  return (
    <>
      <div className="flex min-h-screen">
        {/* Sidebar Menu */}
        <Sidebar />

        {/* Main content */}
        <main className="flex-1 p-6">
          <div className="flex justify-center h-16">
            <h2 className="capitalize  text-[#223A84] text-2xl font-normal w-full bg-white rounded-full px-4 py-4 shadow-md flex gap-4">
              <span> welcome back</span>
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                  fill="none"
                >
                  <g clipPath="url(#clip0_617_2916)">
                    <path
                      d="M4.32101 8.13068C5.15656 7.54668 6.41612 7.65868 7.16634 8.27823L6.3059 7.02757C5.61345 6.04001 5.86145 4.97157 6.8499 4.27823C7.83834 3.58757 10.6392 5.44446 10.6392 5.44446C9.94056 4.44712 10.0712 3.18312 11.0686 2.48357C11.5481 2.14853 12.1409 2.01754 12.717 2.11938C13.293 2.22121 13.805 2.54755 14.1406 3.02668L23.4028 16.1111L22.2223 27.5556L12.3708 23.9627L3.7779 11.2222C3.61034 10.9837 3.49146 10.7144 3.42807 10.4298C3.36467 10.1453 3.35801 9.85099 3.40845 9.56385C3.45889 9.27671 3.56546 9.00233 3.72204 8.75641C3.87863 8.51049 4.08216 8.29786 4.32101 8.13068Z"
                      fill="#EF9645"
                    />
                    <path
                      d="M2.39607 15.4098C2.39607 15.4098 1.38985 13.9432 2.8574 12.9378C4.32318 11.9325 5.32851 13.3983 5.32851 13.3983L9.99607 20.2054C10.157 19.9369 10.333 19.6721 10.5294 19.4107L4.05118 9.9645C4.05118 9.9645 3.04585 8.49872 4.51251 7.49338C5.97829 6.48805 6.98362 7.95383 6.98362 7.95383L13.077 16.8401C13.3036 16.6552 13.5356 16.4694 13.7747 16.2872L6.71074 5.98405C6.71074 5.98405 5.7054 4.51827 7.17207 3.51294C8.63785 2.50761 9.64318 3.97338 9.64318 3.97338L16.7072 14.2747C16.9667 14.1156 17.2236 13.9778 17.4814 13.8321L10.8787 4.20361C10.8787 4.20361 9.8734 2.73783 11.3392 1.7325C12.805 0.727162 13.8103 2.19294 13.8103 2.19294L20.7916 12.3743L21.853 13.9227C17.4547 16.9396 17.0361 22.6152 19.549 26.2801C20.0512 27.0134 20.7845 26.5112 20.7845 26.5112C17.7685 22.1121 18.6894 17.1689 23.0885 14.1529L21.7916 7.66227C21.7916 7.66227 21.3072 5.95205 23.0165 5.46672C24.7267 4.98227 25.2121 6.6925 25.2121 6.6925L26.7098 11.1405C27.3036 12.9041 27.9356 14.6614 28.7721 16.3236C31.1338 21.0169 29.7232 26.8498 25.2698 29.9049C20.4121 33.2356 13.7712 31.9974 10.4396 27.1405L2.39607 15.4098Z"
                      fill="#FFC83D"
                    />
                    <path
                      d="M10.6665 28.4818C7.1109 28.4818 3.51801 24.8889 3.51801 21.3333C3.51801 20.8418 3.15801 20.4444 2.66646 20.4444C2.1749 20.4444 1.74023 20.8418 1.74023 21.3333C1.74023 26.6666 5.33312 30.2595 10.6665 30.2595C11.158 30.2595 11.5553 29.8249 11.5553 29.3333C11.5553 28.8418 11.158 28.4818 10.6665 28.4818Z"
                      fill="#5DADEC"
                    />
                    <path
                      d="M6.22222 30.2222C3.55556 30.2222 1.77778 28.4444 1.77778 25.7778C1.77778 25.542 1.68413 25.3159 1.51743 25.1492C1.35073 24.9825 1.12464 24.8889 0.888889 24.8889C0.653141 24.8889 0.427049 24.9825 0.26035 25.1492C0.0936505 25.3159 0 25.542 0 25.7778C0 29.3333 2.66667 32 6.22222 32C6.45797 32 6.68406 31.9063 6.85076 31.7396C7.01746 31.5729 7.11111 31.3469 7.11111 31.1111C7.11111 30.8754 7.01746 30.6493 6.85076 30.4826C6.68406 30.3159 6.45797 30.2222 6.22222 30.2222ZM21.3333 1.77777C21.0976 1.77777 20.8715 1.87142 20.7048 2.03812C20.5381 2.20482 20.4444 2.43091 20.4444 2.66666C20.4444 2.90241 20.5381 3.1285 20.7048 3.2952C20.8715 3.4619 21.0976 3.55555 21.3333 3.55555C24.8889 3.55555 28.4444 6.74577 28.4444 10.6667C28.4444 10.9024 28.5381 11.1285 28.7048 11.2952C28.8715 11.4619 29.0976 11.5555 29.3333 11.5555C29.5691 11.5555 29.7952 11.4619 29.9619 11.2952C30.1286 11.1285 30.2222 10.9024 30.2222 10.6667C30.2222 5.76533 26.6667 1.77777 21.3333 1.77777Z"
                      fill="#5DADEC"
                    />
                    <path
                      d="M25.7776 0.037323C25.2869 0.037323 24.8887 0.398212 24.8887 0.888879C24.8887 1.37955 25.2869 1.8151 25.7776 1.8151C28.4442 1.8151 30.1847 3.79288 30.1847 6.22221C30.1847 6.71288 30.6193 7.1111 31.1109 7.1111C31.6024 7.1111 31.9624 6.71288 31.9624 6.22221C31.9624 2.81155 29.3331 0.037323 25.7776 0.037323Z"
                      fill="#5DADEC"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_617_2916">
                      <rect width="32" height="32" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </span>
            </h2>
          </div>
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default MasterLayout;
