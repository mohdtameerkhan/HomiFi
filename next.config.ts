// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   /* config options here */
// };

// export default nextConfig;


import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    qualities: [75, 90],
    remotePatterns: [
      {

        protocol: "https",
        hostname: "ap.rdcpix.com",
       
      },
      {
        protocol: "https",
        hostname: "nh.rdcpix.com",
      },
      {
  protocol: "https",
  hostname: "ar.rdcpix.com",
},
    ],
  },
};

export default nextConfig;
