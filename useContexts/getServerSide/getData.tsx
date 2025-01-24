export const getServerSideCars = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/front/cars`, {
    cache: "no-cache",
  });

  return res.json();
};

export const getServerSideParts = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/front/parts`, {
    cache: "no-cache",
  });

  return res.json();
};

export const getServerSideServices = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/front/Servcenters`,
    {
      cache: "no-cache",
    }
  );

  return res.json();
};

export const getServerSideOneCar = async (id: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/front/cars/${id}`,
    {
      cache: "no-cache",
    }
  );

  return res.json();
};

export const getServerSideOnePart = async (id: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/front/parts/${id}`,
    {
      cache: "no-cache",
    }
  );

  return res.json();
};

export const getServerSideOneService = async (id: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/front/Servcenters/${id}`,
    {
      cache: "no-cache",
    }
  );

  return res.json();
};
