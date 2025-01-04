import React, { useEffect } from "react";
import { useRef, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import "react-toastify/dist/ReactToastify.css";
// https://lordicon.com/icons/wired/outline

const Manager = () => {
  const ref = useRef();
  const passwordRef = useRef();
  const [form, setform] = useState({ site: "", username: "", password: "" });
  const [passwordArray, setPasswordArray] = useState([]);

  const getPassword = async () => {
    let req = await fetch("http://localhost:3000/");
    let passwords = await req.json();
    console.log(passwords)
    setPasswordArray(passwords);
  };

  useEffect(() => {
    getPassword();
  }, []);

  const showPassword = () => {
    // alert("Show Password")
    passwordRef.current.type = "password";
    if (ref.current.src.includes("icons/close_eye.png")) {
      ref.current.src = "icons/eye.png";
      passwordRef.current.type = "password";
    } else {
      ref.current.src = "icons/close_eye.png";
      passwordRef.current.type = "text";
    }
  };



  const savePassword = async () => {
    if (form.site.length > 3 && form.username.length > 3 && form.password.length > 3) {
      const newPassword = { ...form, id: uuidv4() };
      setPasswordArray([...passwordArray, newPassword]);
      await fetch("http://localhost:3000/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newPassword),
      });
      setform({ site: "", username: "", password: "" });
      toast.success("Password Saved Successfully!");
    } else {
      toast.error("Password not Saved!");
    }
  };
  

  const deletePassword = async (id) => {
    console.log("deleting by id: ", id);
    setPasswordArray(passwordArray.filter((item) => item.id !== id));
    // localStorage.setItem(
    //   "passwords",
    //   JSON.stringify(passwordArray.filter((item) => item.id !== id))
    // );

    let res = await fetch("http://localhost:3000/", {method: "DELETE", headers: {"Content-Type": "application/json"}, body: JSON.stringify({ id})})


    toast("Password Deleted!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };

  const editPassword = async (id) => {
    await fetch("http://localhost:3000/", {method: "DELETE", headers: {"Content-Type": "application/json"}, body: JSON.stringify({ id})})
    console.log("Editing by id: ", id);
    setform({...passwordArray.filter((i) => i.id === id)[0], id: id});
    setPasswordArray(passwordArray.filter((item) => item.id !== id));
    // await fetch("http://localhost:3000/", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(newPassword),
    // });
  };

  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };

  const copyText = (text) => {
    toast("Copied to Clipboard!", {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    navigator.clipboard.writeText(text);
  };

  return (
    <>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition="Bounce"
      />
      {/* Same as */}
      <ToastContainer />
      <div className="absolute inset-0 -z-10 h-full w-full bg-green-50 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-green-400 opacity-20 blur-[100px]"></div>
      </div>

      <div className="mx-auto bg-slate-100 max-w-6xl p-10">
        <h1 className="text-4xl mb-3 font-bold text-center">
          <span className="text-green-500">&lt;</span>
          Pass
          <span className="text-green-500">OP/&gt;</span>
        </h1>
        <p className="text-green-900 mb-4 text-lg text-center">
          Your own Password Manager
        </p>
        <div className="flex flex-col p-4 text-black gap-8 items-center">
          <input
            value={form.site}
            onChange={handleChange}
            placeholder="Enter website URL"
            className="rounded-full border border-green-500 w-full p-4 py-1"
            type="text"
            name="site"
            id=""
          />
          <div className="flex w-full gap-8 justify-between">
            <input
              value={form.username}
              onChange={handleChange}
              placeholder="Enter Username"
              className="rounded-full border border-green-500 w-full p-4 py-1"
              type="text"
              name="username"
            />
            <div className="relative">
              <input
                ref={passwordRef}
                value={form.password}
                onChange={handleChange}
                placeholder="Enter Password"
                className="rounded-full border border-green-500 w-full p-4 py-1"
                type="password"
                name="password"
              />
              <span
                className="absolute right-[5px] top-[4px]"
                onClick={showPassword}
              >
                <img
                  ref={ref}
                  className="p-1 cursor-pointer"
                  width={26}
                  src="icons/eye.png"
                  alt="eye"
                />
              </span>
            </div>
          </div>
          <div
            onClick={savePassword}
            className="flex border-2 justify-center cursor-pointer w-fit bg-green-400 py-2 px-8 rounded-3xl gap-2 hover:bg-white hover:border-green-500 hover:border-2"
          >
            <lord-icon
              src="https://cdn.lordicon.com/jgnvfzqg.json"
              trigger="hover"
              colors="primary:#000000"
              // style="width:250px;height:250px"
            ></lord-icon>
            <button className="font-bold">Save</button>
          </div>
        </div>
        <div className="passwords">
          <h2 className="font-bold text-2xl py-4">Your Passwords</h2>
          {passwordArray.length === 0 && (
            <div className="text-xl justify-center items-center flex mt-2 font-semibold">
              No password to show!
            </div>
          )}
          {passwordArray.length != 0 && (
            <table className="table-auto w-full rounded-md overflow-hidden">
              <thead className="bg-green-800 text-white">
                <tr>
                  <th className="py-2">Site</th>
                  <th className="py-2">Username</th>
                  <th className="py-2">Password</th>
                  <th className="py-2">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-green-100">
                {passwordArray.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td className=" py-2 border border-white text-center w-32">
                        <div className="flex justify-between px-5 items-center">
                          <a href={item.site} target="_blank">
                            {item.site}
                          </a>
                          <img
                            onClick={() => {
                              copyText(item.site);
                            }}
                            className="cursor-pointer"
                            width={20}
                            src="/icons/copy.png"
                            alt=""
                          />
                        </div>
                      </td>
                      <td className="py-2 border border-white text-center w-32">
                        <div className="flex justify-between px-5 items-center">
                          {item.username}
                          <img
                            onClick={() => {
                              copyText(item.username);
                            }}
                            className="cursor-pointer"
                            width={20}
                            src="/icons/copy.png"
                            alt=""
                          />
                        </div>
                      </td>
                      <td className="py-2 border border-white text-center w-32">
                        <div className="flex justify-between px-5 items-center">
                          {"*".repeat(item.password.length)}
                          <img
                            onClick={() => {
                              copyText(item.password);
                            }}
                            className="cursor-pointer"
                            width={20}
                            src="/icons/copy.png"
                            alt=""
                          />
                        </div>
                      </td>
                      <td className="py-2 border border-white text-center w-32">
                        <div className="justify-center items-center flex gap-4">
                          <img
                            onClick={() => {
                              editPassword(item.id);
                            }}
                            className="cursor-pointer"
                            width={20}
                            src="/icons/edit.png"
                            alt=""
                          />
                          <img
                            onClick={() => {
                              deletePassword(item.id);
                            }}
                            className="cursor-pointer"
                            width={20}
                            src="/icons/delete.png"
                            alt=""
                          />
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};

export default Manager;
