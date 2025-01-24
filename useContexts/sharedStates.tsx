"use client";
import React, { useContext, useEffect } from "react";

import { createContext, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { axiosUser } from "./AxiosClient/AxiosClient";

export const AxiosForSharingStatesAxiosContext = createContext<any>(null);

const SharingStatesContext = ({ children }: any) => {
  const [authorization, setAuthorization] = useState("");
  const [isAuthorizedUser, setIsAuthorizedUser] = useState(false);
  const [isAuthorizedAdmin, setIsAuthorizedAdmin] = useState(false);

  const [showMenu, setShowMenu] = useState(false);
  const [showMenuUser, setShowMenuUser] = useState(false);

  const [OpenServImgPopup, setOpenServImgPopup] = useState({});
  const [OpenVinImgPopup, setOpenVinImgPopup] = useState({});

  const [servData, setServData] = useState([]);

  const [alertShow, setAlertShow] = useState(false);
  const [alertStatus, setAlertStatus] = useState(false);
  const [alertText, setAlertText] = useState("");

  useEffect(() => {
    if (alertShow) {
      const timer = setTimeout(() => {
        setAlertShow(false);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [alertShow]);

  // firm models

  const [newRenderFirmsModels, setNewRenderFirmsModels] = useState(null);
  const [FirmsData, setFirmsData] = useState<any>([]);
  const [ModelsData, setModelssData] = useState<any>([]);
  const [FirmsModelsLoader, setFirmsModelsLoader] = useState<boolean>(true);

  useEffect(() => {
    setFirmsModelsLoader(true);
    const fetchAPIs = async () => {
      try {
        const [res1, res2] = await Promise.all([
          axiosUser.get("front/firm?page=1&per_page=99999"),
          axiosUser.get("front/model?page=1&per_page=99999"),
        ]);

        const transformedFirmsData = res1.data[0].map((item) => ({
          ...item,
          name: item.title,
        }));

        const transformedModelsData = res2.data[0].map((item) => ({
          ...item,
          name: item.title,
        }));

        setFirmsData(transformedFirmsData);
        setModelssData(transformedModelsData);

        setFirmsModelsLoader(false);
      } catch (err) {}
    };

    fetchAPIs();
  }, [newRenderFirmsModels]);

  // firm models

  const [vehicleType, setVehicleType] = useState([
    {
      id: 1,
      name: "სედანი",
    },
    {
      id: 2,
      name: "ჯიპი",
    },
    {
      id: 3,
      name: "კუპე",
    },
    {
      id: 4,
      name: "ჰეტჩბექი",
    },
    {
      id: 5,
      name: "უნივერსალი",
    },
    {
      id: 6,
      name: "კაბრიოლეტი",
    },
    {
      id: 7,
      name: "პიკაპი",
    },
    {
      id: 8,
      name: "მინივენი",
    },
    {
      id: 9,
      name: "მიკროავტობუსი",
    },
    {
      id: 10,
      name: "ფურგონი",
    },
    {
      id: 11,
      name: "ლიმუზინი",
    },
    {
      id: 12,
      name: "კროსოვერი",
    },
  ]);

  const [years, setYears] = useState(
    Array.from({ length: 2024 - 1950 + 1 }, (v, i) => ({
      id: i + 1,
      name: 2024 - i,
    }))
  );

  const [engine, setEngine] = useState(
    Array.from({ length: 130 }, (v, i) => {
      const value = (i + 1) / 10;
      return {
        id: value.toFixed(1),
        name: value.toFixed(1),
      };
    })
  );

  const [price, setPrice] = useState([
    {
      id: 1,
      name: "5000",
    },
    {
      id: 2,
      name: "10000",
    },
    {
      id: 3,
      name: "15000",
    },
    {
      id: 4,
      name: "20000",
    },
    {
      id: 5,
      name: "50000",
    },
    {
      id: 6,
      name: "100000",
    },
  ]);

  const [transmission, setTransmission] = useState([
    {
      id: 1,
      name: "მექანიკა",
    },
    {
      id: 2,
      name: "ავტომატიკა",
    },
    {
      id: 3,
      name: "ტიპტრონიკი",
    },
    {
      id: 4,
      name: "ვარიატორი",
    },
  ]);

  const [petrol, setPetrol] = useState([
    {
      id: 1,
      name: "ბენზინი",
    },
    {
      id: 2,
      name: "გაზი",
    },
    {
      id: 3,
      name: "დიზელი",
    },
    {
      id: 4,
      name: "ჰიბრიდი",
    },
    {
      id: 5,
      name: "გაზი/ბენზინი",
    },
  ]);

  const [weel, setWeel] = useState([
    {
      id: 1,
      name: "მარჯვენა",
    },
    {
      id: 2,
      name: "მარცხენა",
    },
  ]);

  const [colors, setColors] = useState([
    {
      id: 1,
      name: "თეთრი",
      color: "white",
    },
    {
      id: 2,
      name: "შავი",
      color: "black",
    },
    {
      id: 3,
      name: "ვერცხლისფერი",
      color: "#e0e0e0",
    },
    {
      id: 4,
      name: "რუხი",
      color: "#7f7f7f",
    },
    {
      id: 5,
      name: "წითელი",
      color: "red",
    },
    {
      id: 6,
      name: "ლურჯი",
      color: "blue",
    },
    {
      id: 7,
      name: "ყვითელი",
      color: "yellow",
    },
    {
      id: 8,
      name: "მწვანე",
      color: "green",
    },
    {
      id: 9,
      name: "ნარინჯისფერი",
      color: "orange",
    },
    {
      id: 10,
      name: "ოქროსფერი",
      color: "#7f7f7f",
    },
    {
      id: 11,
      name: "იისფერი",
      color: "#8c3bf0",
    },
    {
      id: 12,
      name: "ვარდისფერი",
      color: "pink",
    },
    {
      id: 13,
      name: "ჩალისფერი",
      color: "#ede1d3",
    },
    {
      id: 14,
      name: "შინდისფერი",
      color: "#990000",
    },
    {
      id: 15,
      name: "ცისფერი",
      color: "#a2d2ff",
    },
    {
      id: 16,
      name: "ყავისფერი",
      color: "brown",
    },
  ]);

  const [servicetype, setServiceType] = useState([
    {
      id: 1,
      name: "ძრავი",
    },
    {
      id: 2,
      name: "სავალი ნაწილი",
    },
    {
      id: 3,
      name: "ქიმწმენდა",
    },
    {
      id: 4,
      name: "ვულკანიზაცია",
    },
    {
      id: 5,
      name: "ელ-დიაგნოსტიკა",
    },
    {
      id: 6,
      name: "მინების დაბურვა",
    },
    {
      id: 7,
      name: "მეთუნუქე",
    },
  ]);

  const [adress, setAdress] = useState([
    {
      id: 1,
      name: "თბილისი",
      latlng: {
        lat: 41.7151,
        lng: 44.8271,
      },
    },
    {
      id: 2,
      name: "ქუთაისი",
      latlng: {
        lat: 42.2679,
        lng: 42.6946,
      },
    },
    {
      id: 3,
      name: "ბათუმი",
      latlng: {
        lat: 41.6168,
        lng: 41.6367,
      },
    },
    {
      id: 4,
      name: "ფოთი",
      latlng: {
        lat: 42.1522,
        lng: 41.6719,
      },
    },
    {
      id: 5,
      name: "რუსთავი",
      latlng: {
        lat: 41.5336,
        lng: 45.0,
      },
    },
    {
      id: 6,
      name: "რუსთავის ავტობაზრობა",
      latlng: {
        lat: 41.5397,
        lng: 44.9759,
      },
    },
    {
      id: 7,
      name: "კავკასიის ავტომარკეტი",
      latlng: {
        lat: 41.6511,
        lng: 44.959,
      },
    },
    {
      id: 8,
      name: "ჩხოროწყუ",
      latlng: {
        lat: 42.5141,
        lng: 42.1337,
      },
    },
    {
      id: 9,
      name: "ახმეტა",
      latlng: {
        lat: 42.0386,
        lng: 45.2063,
      },
    },
    {
      id: 10,
      name: "ზესტაფონი",
      latlng: {
        lat: 42.1092,
        lng: 43.052,
      },
    },
    {
      id: 11,
      name: "ბორჯომი",
      latlng: {
        lat: 41.839,
        lng: 43.3872,
      },
    },
    {
      id: 12,
      name: "კასპი",
      latlng: {
        lat: 41.918,
        lng: 44.4246,
      },
    },
    {
      id: 13,
      name: "საგარეჯო",
      latlng: {
        lat: 41.7312,
        lng: 45.3377,
      },
    },
    {
      id: 14,
      name: "ახალციხე",
      latlng: {
        lat: 41.6397,
        lng: 42.9825,
      },
    },
    {
      id: 15,
      name: "სოხუმი",
      latlng: {
        lat: 43.0025,
        lng: 41.0137,
      },
    },
    {
      id: 16,
      name: "ქობულეთი",
      latlng: {
        lat: 41.8214,
        lng: 41.7805,
      },
    },
    {
      id: 17,
      name: "გურჯაანი",
      latlng: {
        lat: 41.742,
        lng: 45.798,
      },
    },
    {
      id: 18,
      name: "მარტვილი",
      latlng: {
        lat: 42.4137,
        lng: 42.3756,
      },
    },
    {
      id: 19,
      name: "ჭიათურა",
      latlng: {
        lat: 42.2976,
        lng: 43.293,
      },
    },
    {
      id: 20,
      name: "დუშეთი",
      latlng: {
        lat: 42.0849,
        lng: 44.6901,
      },
    },
    {
      id: 21,
      name: "ლაგოდეხი",
      latlng: {
        lat: 41.8223,
        lng: 46.2747,
      },
    },
    {
      id: 22,
      name: "თელავი",
      latlng: {
        lat: 41.9185,
        lng: 45.4719,
      },
    },
    {
      id: 23,
      name: "მცხეთა",
      latlng: {
        lat: 41.8457,
        lng: 44.7209,
      },
    },
    {
      id: 24,
      name: "ცხინვალი",
      latlng: {
        lat: 42.2273,
        lng: 43.9686,
      },
    },
    {
      id: 25,
      name: "ახალქალაქი",
      latlng: {
        lat: 41.4081,
        lng: 43.4865,
      },
    },
    {
      id: 26,
      name: "გორი",
      latlng: {
        lat: 41.9854,
        lng: 44.1101,
      },
    },
    {
      id: 27,
      name: "ხაშური",
      latlng: {
        lat: 42.016,
        lng: 43.5995,
      },
    },
    {
      id: 28,
      name: "ამბროლაური",
      latlng: {
        lat: 42.5215,
        lng: 43.1561,
      },
    },
    {
      id: 29,
      name: "ოზურგეთი",
      latlng: {
        lat: 41.9931,
        lng: 42.0089,
      },
    },
    {
      id: 30,
      name: "ზუგდიდი",
      latlng: {
        lat: 42.5088,
        lng: 41.8693,
      },
    },
    {
      id: 31,
      name: "სენაკი",
      latlng: {
        lat: 42.272,
        lng: 42.0679,
      },
    },
    {
      id: 32,
      name: "სიღნაღი",
      latlng: {
        lat: 41.6204,
        lng: 45.9227,
      },
    },
    {
      id: 33,
      name: "ქარელი",
      latlng: {
        lat: 42.0221,
        lng: 43.8946,
      },
    },
    {
      id: 34,
      name: "მარნეული",
      latlng: {
        lat: 41.475,
        lng: 44.81,
      },
    },
    {
      id: 35,
      name: "გარდაბანი",
      latlng: {
        lat: 41.4561,
        lng: 45.0916,
      },
    },
    {
      id: 36,
      name: "სამტრედია",
      latlng: {
        lat: 42.1583,
        lng: 42.3367,
      },
    },
    {
      id: 37,
      name: "მესტია",
      latlng: {
        lat: 43.0457,
        lng: 42.7206,
      },
    },
    {
      id: 38,
      name: "საჩხერე",
      latlng: {
        lat: 42.346,
        lng: 43.4287,
      },
    },
    {
      id: 39,
      name: "ხობი",
      latlng: {
        lat: 42.3166,
        lng: 41.9012,
      },
    },
    {
      id: 40,
      name: "თიანეთი",
      latlng: {
        lat: 42.1091,
        lng: 44.9731,
      },
    },
    {
      id: 41,
      name: "ფოთის 'გეზ'-ი",
      latlng: {
        lat: 42.1468,
        lng: 41.6719,
      },
    },
    {
      id: 42,
      name: "ბათუმის 'გეზ'-ი",
      latlng: {
        lat: 41.6168,
        lng: 41.6367,
      },
    },
    {
      id: 43,
      name: "ყვარელი",
      latlng: {
        lat: 41.9434,
        lng: 45.8012,
      },
    },
    {
      id: 44,
      name: "ტყიბული",
      latlng: {
        lat: 42.3451,
        lng: 42.9914,
      },
    },
    {
      id: 45,
      name: "დედოფლისწყარო",
      latlng: {
        lat: 41.4687,
        lng: 46.0895,
      },
    },
    {
      id: 46,
      name: "ონი",
      latlng: {
        lat: 42.5787,
        lng: 43.4428,
      },
    },
    {
      id: 47,
      name: "ბოლნისი",
      latlng: {
        lat: 41.4474,
        lng: 44.5364,
      },
    },
    {
      id: 48,
      name: "წყალტუბო",
      latlng: {
        lat: 42.3383,
        lng: 42.5994,
      },
    },
    {
      id: 49,
      name: "თეთრიწყარო",
      latlng: {
        lat: 41.5297,
        lng: 44.4668,
      },
    },
    {
      id: 50,
      name: "თიანეთი",
      latlng: {
        lat: 42.1087,
        lng: 44.9647,
      },
    },
    {
      id: 51,
      name: "ხარაგაული",
      latlng: {
        lat: 42.0192,
        lng: 43.2035,
      },
    },
    {
      id: 52,
      name: "წალკა",
      latlng: {
        lat: 41.6009,
        lng: 44.0913,
      },
    },
    {
      id: 53,
      name: "წალენჯიხა",
      latlng: {
        lat: 42.6004,
        lng: 42.0688,
      },
    },
    {
      id: 54,
      name: "წეროვანი",
      latlng: {
        lat: 41.8647,
        lng: 44.6351,
      },
    },
    {
      id: 55,
      name: "ლანჩხუთი",
      latlng: {
        lat: 42.0865,
        lng: 42.0295,
      },
    },
    {
      id: 56,
      name: "სართიჭალა",
      latlng: {
        lat: 41.7107,
        lng: 45.0129,
      },
    },
    {
      id: 57,
      name: "ხონი",
      latlng: {
        lat: 42.3238,
        lng: 42.4232,
      },
    },
    {
      id: 58,
      name: "ნინოწმინდა",
      latlng: {
        lat: 41.2677,
        lng: 43.5869,
      },
    },
    {
      id: 59,
      name: "ასპინძა",
      latlng: {
        lat: 41.5733,
        lng: 43.2547,
      },
    },
    {
      id: 60,
      name: "აბაშა",
      latlng: {
        lat: 42.2044,
        lng: 42.2048,
      },
    },
    {
      id: 61,
      name: "ცაგერი",
      latlng: {
        lat: 42.7619,
        lng: 42.9017,
      },
    },
  ]);

  const [cylinders, setCylinders] = useState([
    {
      id: 1,
      name: "1",
    },
    {
      id: 2,
      name: "2",
    },
    {
      id: 3,
      name: "3",
    },
    {
      id: 4,
      name: "4",
    },
    {
      id: 5,
      name: "5",
    },
    {
      id: 6,
      name: "6",
    },
    {
      id: 7,
      name: "7",
    },
    {
      id: 8,
      name: "8",
    },
    {
      id: 9,
      name: "9",
    },
    {
      id: 10,
      name: "10",
    },
    {
      id: 11,
      name: "11",
    },
    {
      id: 12,
      name: "12",
    },
    {
      id: 13,
      name: "13",
    },
    {
      id: 14,
      name: "14",
    },
    {
      id: 15,
      name: "15",
    },
    {
      id: 16,
      name: "16",
    },
  ]);

  const [pullingWheels, setPullingWheels] = useState([
    {
      id: 1,
      name: "წინა",
    },
    {
      id: 2,
      name: "უკანა",
    },
    {
      id: 3,
      name: "4x4",
    },
  ]);

  const [leather, setLeather] = useState([
    {
      id: 1,
      name: "ნაჭერი",
    },
    {
      id: 2,
      name: "ტყავი",
    },
    {
      id: 3,
      name: "ხელოვნური ტყავი",
    },
    {
      id: 4,
      name: "კომბინირებული",
    },
    {
      id: 5,
      name: "ალკანტარა",
    },
  ]);

  const [moreInfoBtn, setMoreInfoBtn] = useState([
    {
      id: 1,
      name: "ლუქი",
    },
    {
      id: 2,
      name: "პანორამა",
    },
    {
      id: 3,
      name: "მულტიმედია",
    },
    {
      id: 4,
      name: "კამერა",
    },
  ]);

  const [days, setDays] = useState(
    Array.from({ length: 31 - 1 + 1 }, (v, i) => ({
      id: i + 1,
      name: i + 1,
    }))
  );

  const [valServs, setValServs] = useState([
    {
      id: 1,
      name: "VIP",
      price: 3,
    },
  ]);

  const [parts, setParts] = useState([
    {
      id: 1,
      name: "ძრავი",
    },
    {
      id: 2,
      name: "გადაცემათა კოლოფი",
    },
    {
      id: 3,
      name: "გიტარა",
    },
    {
      id: 4,
      name: "საბარგული",
    },
    {
      id: 5,
      name: "ძრავსახუფი",
    },
    {
      id: 6,
      name: "საბურავები",
    },
    {
      id: 7,
      name: "დისკები",
    },
    {
      id: 8,
      name: "რული",
    },
  ]);

  const [countries, setcountries] = useState([
    {
      id: 1,
      flag: "/images/usaflag.png",
      Country: "ამერიკა",
      Countryen: "USA",
    },
    {
      id: 2,
      flag: "/images/koreaflag.svg.png",
      Country: "კორეა",
      Countryen: "KOREA",
    },
  ]);

  // cars filer

  const [carsfilterpopup, setCarsfilterPopup] = useState();

  const [carsfltrForParams, setCarsfltrForParams] = useState({
    firm: [],
    model: [],
    country: [],
    pullingWheels: [],
    vehicleType: [],
    // cylinders: [],
    leather: [],
    minPrice: "",
    maxPrice: "",
    minYear: "",
    maxYear: "",
    minMetersRun: "",
    maxMetersRun: "",
    minEngine: "",
    maxEngine: "",
    transmission: [],
    petrol: [],
    weel: [],
    color: [],
    salonColor: [],
    parameters: [],
  });

  const [carsfltrFromParams, setCarsfltrFromParams] = useState({
    firm: [],
    model: [],
    country: [],
    pullingWheels: [],
    vehicleType: [],
    // cylinders: [],
    leather: [],
    minPrice: "",
    maxPrice: "",
    minYear: "",
    maxYear: "",
    minMetersRun: "",
    maxMetersRun: "",
    minEngine: "",
    maxEngine: "",
    transmission: [],
    petrol: [],
    weel: [],
    color: [],
    salonColor: [],
    parameters: [],
  });

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const searchParams = new URLSearchParams();

    if (carsfltrForParams.firm.length > 0)
      searchParams.set("firm", JSON.stringify(carsfltrForParams.firm));

    if (carsfltrForParams.firm.length > 0) {
      if (
        carsfltrForParams.model.length > 0 &&
        FirmsData.filter(
          (data) =>
            carsfltrForParams.firm.some((item) => item === data.name) &&
            carsfltrForParams.model.some((item1) =>
              ModelsData.some((model) => model.name === item1)
            )
        )
      ) {
        searchParams.set("model", JSON.stringify(carsfltrForParams.model));
      }
    } else {
      searchParams.delete("model");
    }

    if (carsfltrForParams.petrol.length > 0)
      searchParams.set("petrol", JSON.stringify(carsfltrForParams.petrol));
    if (carsfltrForParams.country.length > 0)
      searchParams.set("country", JSON.stringify(carsfltrForParams.country));
    if (carsfltrForParams.pullingWheels.length > 0)
      searchParams.set(
        "pullingWheels",
        JSON.stringify(carsfltrForParams.pullingWheels)
      );
    if (carsfltrForParams.weel.length > 0)
      searchParams.set("weel", JSON.stringify(carsfltrForParams.weel));
    if (carsfltrForParams.vehicleType.length > 0)
      searchParams.set(
        "vehicleType",
        JSON.stringify(carsfltrForParams.vehicleType)
      );
    if (carsfltrForParams.transmission.length > 0)
      searchParams.set(
        "transmission",
        JSON.stringify(carsfltrForParams.transmission)
      );
    if (carsfltrForParams.color.length > 0)
      searchParams.set("color", JSON.stringify(carsfltrForParams.color));
    if (carsfltrForParams.salonColor.length > 0)
      searchParams.set(
        "salonColor",
        JSON.stringify(carsfltrForParams.salonColor)
      );
    if (carsfltrForParams.leather.length > 0)
      searchParams.set("leather", JSON.stringify(carsfltrForParams.leather));
    if (carsfltrForParams.parameters.length > 0)
      searchParams.set(
        "parameters",
        JSON.stringify(carsfltrForParams.parameters)
      );

    if (carsfltrForParams.minPrice)
      searchParams.set("minPrice", carsfltrForParams.minPrice);
    if (carsfltrForParams.maxPrice)
      searchParams.set("maxPrice", carsfltrForParams.maxPrice);

    if (carsfltrForParams.minYear)
      searchParams.set("minYear", carsfltrForParams.minYear);
    if (carsfltrForParams.maxYear)
      searchParams.set("maxYear", carsfltrForParams.maxYear);
    if (carsfltrForParams.minMetersRun)
      searchParams.set("minMetersRun", carsfltrForParams.minMetersRun);
    if (carsfltrForParams.maxMetersRun)
      searchParams.set("maxMetersRun", carsfltrForParams.maxMetersRun);
    if (carsfltrForParams.minEngine)
      searchParams.set("minEngine", carsfltrForParams.minEngine);
    if (carsfltrForParams.maxEngine)
      searchParams.set("maxEngine", carsfltrForParams.maxEngine);

    if (pathname === "/cars") {
      router.push(`?${searchParams.toString()}`);
    }
  }, [carsfltrForParams]);

  useEffect(() => {
    setCarsfltrFromParams((prev) => ({
      ...prev,
      firm: searchParams.get("firm")
        ? JSON.parse(searchParams.get("firm"))
        : [],
      model: searchParams.get("model")
        ? JSON.parse(searchParams.get("model"))
        : [],
      country: searchParams.get("country")
        ? JSON.parse(searchParams.get("country"))
        : [],
      pullingWheels: searchParams.get("pullingWheels")
        ? JSON.parse(searchParams.get("pullingWheels"))
        : [],
      vehicleType: searchParams.get("vehicleType")
        ? JSON.parse(searchParams.get("vehicleType"))
        : [],
      // cylinders: searchParams.get("cylinders") ? JSON.parse(searchParams.get("cylinders")) : [],
      leather: searchParams.get("leather")
        ? JSON.parse(searchParams.get("leather"))
        : [],
      transmission: searchParams.get("transmission")
        ? JSON.parse(searchParams.get("transmission"))
        : [],
      petrol: searchParams.get("petrol")
        ? JSON.parse(searchParams.get("petrol"))
        : [],
      weel: searchParams.get("weel")
        ? JSON.parse(searchParams.get("weel"))
        : [],
      color: searchParams.get("color")
        ? JSON.parse(searchParams.get("color"))
        : [],
      salonColor: searchParams.get("salonColor")
        ? JSON.parse(searchParams.get("salonColor"))
        : [],
      parameters: searchParams.get("parameters")
        ? JSON.parse(searchParams.get("parameters"))
        : [],

      minPrice: searchParams.get("minPrice")
        ? searchParams.get("minPrice")
        : "",
      maxPrice: searchParams.get("maxPrice")
        ? searchParams.get("maxPrice")
        : "",
      minYear: searchParams.get("minYear") ? searchParams.get("minYear") : "",
      maxYear: searchParams.get("maxYear") ? searchParams.get("maxYear") : "",
      minMetersRun: searchParams.get("minMetersRun")
        ? searchParams.get("minMetersRun")
        : "",
      maxMetersRun: searchParams.get("maxMetersRun")
        ? searchParams.get("maxMetersRun")
        : "",
      minEngine: searchParams.get("minEngine")
        ? searchParams.get("minEngine")
        : "",
      maxEngine: searchParams.get("maxEngine")
        ? searchParams.get("maxEngine")
        : "",
    }));
  }, [searchParams, setCarsfltrFromParams]);

  const handleClearCarsFilter = () => {
    router.push(`?`);
  };

  const [cardata, setCarData] = useState([]);

  // cars filer

  // parts filer

  const [partsfilterpopup, setPartsfilterPopup] = useState();

  const [partsfltrForParams, setPartsfltrForParams] = useState({
    partName: [],
    condition: "",
    original: "",
    o_city: "",

    minPrice: "",
    maxPrice: "",

    firm: [],
    model: [],
    fyear: "",
    tyear: "",
  });

  const [partsfltrFromParams, setPartsfltrFromParams] = useState({
    partName: [],
    condition: "",
    original: "",
    o_city: "",

    minPrice: "",
    maxPrice: "",

    firm: [],
    model: [],
    fyear: "",
    tyear: "",
  });

  useEffect(() => {
    const searchParams = new URLSearchParams();

    if (partsfltrForParams.firm.length > 0)
      searchParams.set("firm", JSON.stringify(partsfltrForParams.firm));

    if (partsfltrForParams.firm.length > 0) {
      if (
        partsfltrForParams.model.length > 0 &&
        FirmsData.filter(
          (data) =>
            partsfltrForParams.firm.some((item) => item === data) &&
            partsfltrForParams.model.some((item1) =>
              ModelsData.some((model) => model.name === item1)
            )
        )
      ) {
        searchParams.set("model", JSON.stringify(partsfltrForParams.model));
      }
    } else {
      searchParams.delete("model");
    }

    if (partsfltrForParams.partName.length > 0)
      searchParams.set("partName", JSON.stringify(partsfltrForParams.partName));

    if (partsfltrForParams.minPrice)
      searchParams.set("minPrice", partsfltrForParams.minPrice);
    if (partsfltrForParams.maxPrice)
      searchParams.set("maxPrice", partsfltrForParams.maxPrice);

    if (partsfltrForParams.fyear)
      searchParams.set("fyear", partsfltrForParams.fyear);
    if (partsfltrForParams.tyear)
      searchParams.set("tyear", partsfltrForParams.tyear);
    if (partsfltrForParams.condition)
      searchParams.set("condition", partsfltrForParams.condition);
    if (partsfltrForParams.original)
      searchParams.set("original", partsfltrForParams.original);
    if (partsfltrForParams.o_city)
      searchParams.set("o_city", partsfltrForParams.o_city);

    if (pathname === "/parts") {
      router.push(`?${searchParams.toString()}`);
    }
  }, [partsfltrForParams]);

  useEffect(() => {
    setPartsfltrFromParams((prev) => ({
      ...prev,
      firm: searchParams.get("firm")
        ? JSON.parse(searchParams.get("firm"))
        : [],
      model: searchParams.get("model")
        ? JSON.parse(searchParams.get("model"))
        : [],
      partName: searchParams.get("partName")
        ? JSON.parse(searchParams.get("partName"))
        : [],

      minPrice: searchParams.get("minPrice")
        ? searchParams.get("minPrice")
        : "",
      maxPrice: searchParams.get("maxPrice")
        ? searchParams.get("maxPrice")
        : "",
      fyear: searchParams.get("fyear") ? searchParams.get("fyear") : "",
      tyear: searchParams.get("tyear") ? searchParams.get("tyear") : "",
      condition: searchParams.get("condition")
        ? searchParams.get("condition")
        : "",
      original: searchParams.get("original")
        ? searchParams.get("original")
        : "",
      o_city: searchParams.get("o_city") ? searchParams.get("o_city") : "",
    }));
  }, [searchParams, setPartsfltrFromParams]);

  const handleClearPartsFilter = () => {
    router.push(`?`);
  };

  const [partData, setPartData] = useState([]);

  // parts filer

  // service filer

  const [servicefltrForParams, setservicefltrForParams] = useState({
    servcenterName: "",
    services: [],
  });

  const [servicefltrFromParams, setservicefltrFromParams] = useState({
    servcenterName: "",
    services: [],
  });

  useEffect(() => {
    const searchParams = new URLSearchParams();

    if (servicefltrForParams.services.length > 0)
      searchParams.set(
        "services",
        JSON.stringify(servicefltrForParams.services)
      );

    if (servicefltrForParams.servcenterName)
      searchParams.set("servcenterName", servicefltrForParams.servcenterName);

    if (pathname === "/services") {
      router.push(`?${searchParams.toString()}`);
    }
  }, [servicefltrForParams]);

  useEffect(() => {
    setservicefltrFromParams((prev) => ({
      ...prev,

      services: searchParams.get("services")
        ? JSON.parse(searchParams.get("services"))
        : [],

      servcenterName: searchParams.get("servcenterName")
        ? searchParams.get("servcenterName")
        : "",
    }));
  }, [searchParams, setservicefltrFromParams]);

  const handleClearServiceFilter = () => {
    router.push(`?`);
  };

  // service filer

  return (
    <AxiosForSharingStatesAxiosContext.Provider
      value={{
        authorization,
        setAuthorization,
        isAuthorizedUser,
        setIsAuthorizedUser,
        isAuthorizedAdmin,
        setIsAuthorizedAdmin,

        OpenServImgPopup,
        setOpenServImgPopup,

        carsfilterpopup,
        setCarsfilterPopup,
        carsfltrForParams,
        setCarsfltrForParams,
        carsfltrFromParams,
        setCarsfltrFromParams,
        handleClearCarsFilter,
        cardata,
        setCarData,

        servicefltrForParams,
        setservicefltrForParams,
        servicefltrFromParams,
        setservicefltrFromParams,
        handleClearServiceFilter,

        partsfilterpopup,
        setPartsfilterPopup,
        partsfltrForParams,
        setPartsfltrForParams,
        partsfltrFromParams,
        setPartsfltrFromParams,
        handleClearPartsFilter,
        partData,
        setPartData,

        showMenu,
        setShowMenu,
        showMenuUser,
        setShowMenuUser,

        OpenVinImgPopup,
        setOpenVinImgPopup,

        servData,
        setServData,

        alertShow,
        setAlertShow,
        alertStatus,
        setAlertStatus,
        alertText,
        setAlertText,

        countries,
        vehicleType,
        years,
        price,
        engine,
        transmission,
        petrol,
        weel,
        colors,
        servicetype,
        adress,
        cylinders,
        pullingWheels,
        leather,
        moreInfoBtn,
        days,
        valServs,
        parts,

        FirmsData,
        ModelsData,
        setNewRenderFirmsModels,
        FirmsModelsLoader,
      }}
    >
      {children}
    </AxiosForSharingStatesAxiosContext.Provider>
  );
};

export default SharingStatesContext;
