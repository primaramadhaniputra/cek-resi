"use client";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {Fragment, useEffect, useState} from "react";
import Location from "@/components/icons/Location";
import ArrowLongRight from "@/components/icons/ArrowLongRight";
import EllipsisVertical from "@/components/icons/EllipsisVertical";
import User from "@/components/icons/User";
import UserGroup from "@/components/icons/UserGroup";

interface ResponseDataResi {
  detail: {
    origin: string;
    destination: string;
    shipper: string;
    receiver: string;
  };
  history: {
    date: string;
    desc: string;
    location: string;
  }[];
  summary: {
    awb: string;
    courier: string;
    service: string;
    status: string;
    date: string;
    desc: string;
    amount: string;
    weight: string;
  };
}

export default function Home() {
  const [listCouriers, setListCouriers] = useState<
    {code: string; description: string}[]
  >([]);
  const [resi, setResi] = useState("");
  const [courier, setCourier] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<ResponseDataResi>();

  const handleGetListCourier = async () => {
    fetch(`https://api.binderbyte.com/v1/list_courier?api_key=${process.env.NEXT_PUBLIC_API_KEY}
    `)
      .then((response) => response.json())
      .then((data) => setListCouriers(data))
      .catch((error) => console.error(error));
  };

  const handleGetResi = async () => {
    if (!courier || !resi || courier === "Pilih Courier") {
      return alert("Harap isi courier / resi");
    }
    setIsLoading(true);
    fetch(
      `https://api.binderbyte.com/v1/track?api_key=${process.env.NEXT_PUBLIC_API_KEY}&courier=${courier}&awb=${resi}`
    )
      .then((response) => response.json())
      .then((data) => setData(data.data))
      .catch((error) => console.error(error))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    handleGetListCourier();
  }, []);

  return (
    <div className="bg-gradient-to-r from-indigo-200 to-indigo-50 min-h-screen p-5 flex  flex-col">
      <div className="w-full justify-center flex gap-2">
        <div className="flex-1 max-w-96 mb-2  ">
          <select
            id="countries"
            className="bg-gray-50 border border-gray-300 text-gray-900  rounded-lg focus:ring-black focus:border-black block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-black dark:focus:border-black h-14 font-montserrat text-lg "
            onChange={(e) => setCourier(e.target.value)}
          >
            <option selected>Pilih Courier</option>
            {listCouriers.map((item) => (
              <option value={item.code} key={item.code}>
                {item.description}
              </option>
            ))}
          </select>
        </div>
        <div className="w-14" />
      </div>
      <div className="w-full flex justify-center gap-2">
        <Input
          className="font-montserrat h-14 text-lg rounded-lg max-w-96"
          placeholder="Masukkan nomor resi..."
          onChange={(e) => setResi(e.target.value)}
        />
        <Button
          disabled={isLoading}
          className="font-montserrat h-14 text-lg rounded-full w-14"
          onClick={handleGetResi}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="2"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            />
          </svg>
        </Button>
      </div>
      {data ? (
        <div className="bg-white mx-auto w-full max-w-[500px] mt-8 p-5 rounded-lg shadow-md relative overflow-hidden">
          <div className="absolute right-0 top-0 bg-blue-200 text-blue-500 rounded-bl-lg p-2">
            <p className="font-montserrat text-sm font-medium">
              {data.summary.status}
            </p>
          </div>
          <div className="flex  justify-around gap-10 mt-5 overflow-x-auto">
            <div className="flex  gap-1">
              <div>
                <Location style={{color: "gray"}} />
              </div>
              <p className="text-gray-400 font-montserrat ">
                {data.detail.origin}
              </p>
            </div>
            <div className="flex items-center gap-5">
              <ArrowLongRight />
            </div>
            <div className="flex gap-1 ">
              <div>
                <Location style={{color: "green"}} />
              </div>
              <p className="text-green-700 font-montserrat font-medium ">
                {data.detail.destination}
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-4 mt-7">
            <div className="flex gap-2">
              <div>
                <UserGroup />
              </div>
              <div className=" flex flex-col ">
                <p className="text-gray-400 font-montserrat text-sm">
                  Pengirim :
                </p>
                <p className="font-montserrat"> {data.detail.shipper}</p>
              </div>
            </div>
            <div className="flex  gap-2">
              <div>
                <User />
              </div>
              <div className=" flex flex-col ">
                <p className="text-gray-400 font-montserrat text-sm">
                  Penerima :
                </p>
                <p className="font-montserrat"> {data.detail.receiver}</p>
              </div>
            </div>
          </div>
          <div className="mt-5">
            <p className="font-montserrat">
              <b>{data.summary.desc || "-"}</b>, dikirim dengan{" "}
              <b>{data.summary.courier}</b>, dengan total berat{" "}
              <b>{data.summary.weight || "-"}</b>
            </p>
          </div>
          <div className="mt-5">
            {data.history.map((item, idx) => (
              <Fragment key={idx}>
                <div className="flex gap-2 items-center">
                  <div>
                    <Location
                      style={{
                        color:
                          idx === 0
                            ? "green"
                            : idx === data.history.length - 1
                            ? "orange"
                            : "gray",
                      }}
                    />
                  </div>
                  <div>
                    <p className="font-montserrat text-sm text-gray-400 ">
                      {item.date}
                    </p>
                    <p className="font-montserrat text-sm font-medium text-gray-500">
                      {item.desc}
                    </p>
                  </div>
                </div>
                {idx < data.history.length - 1 ? <EllipsisVertical /> : null}
              </Fragment>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}
