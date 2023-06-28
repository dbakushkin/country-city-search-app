import React, { FC, useState, useEffect } from "react";

interface Results {
  address_line1: string;
  result_type: string;
}

const CountrySearch: FC = () => {
  const [inputValue, setInputValue] = useState("");
  const [addressList, setAddressList] = useState<Results[]>([]);
  const [hideDropdown, setHideDropdown] = useState<object>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    setHideDropdown({});
  };

  const apiKey: string | undefined = "d995a557f99a4d0c937125d471b5d148";
  const baseUrl: string = `https://api.geoapify.com/v1/geocode/autocomplete?text=${inputValue}&format=json&type=country&apiKey=${apiKey}&limit=2&lang=ru`;

  const getData = async () => {
    try {
      const response = await fetch(baseUrl);
      if (!response.ok) {
        throw new Error("Ошибка запроса");
      }
      const data = await response.json();
      setAddressList(data.results);
    } catch (error: any) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    if (inputValue) {
      getData();
    } else {
      setAddressList([]);
      console.log(addressList);
    }
  }, [inputValue]);

  const handleSetData = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
    setInputValue(`${e.currentTarget.id}`);
    setHideDropdown({ display: "none" });
  };

  return (
    <>
      <h3>Страна</h3>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Введите страну"
      />
      {inputValue && addressList.length > 0 && (
        <div style={hideDropdown}>
          <ul>
            {addressList &&
              addressList.map((result, idx) => (
                <li
                  key={idx}
                  onClick={handleSetData}
                  id={`${result.address_line1}`}
                >
                  {result.address_line1}
                </li>
              ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default CountrySearch;
