"use client";
import { cn } from "@/libs/utils";
import React, { useEffect, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Input } from "../ui/input";
import { SendIcon } from "lucide-react";
import { Square } from "ldrs/react";
import "ldrs/react/Square.css";
import { Tailspin } from "ldrs/react";
import "ldrs/react/Tailspin.css";
import ReactMarkdown from "react-markdown";
const Chatbot = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useGSAP(() => {
    const tl = gsap.timeline();

    if (isOpen) {
      tl.to("#chatbot", {
        duration: 0.1,
        width: "20rem",
        padding: "1rem",
        borderRadius: "1rem",
      });
      tl.to("#chatbot", {
        duration: 0.1,
        height: "30rem",
        padding: "1rem 0",
        borderRadius: "1rem",
      });
    } else {
      tl.to("#chatbot", {
        duration: 0.1,
        height: "3rem",
      });
      tl.to("#chatbot", {
        duration: 0.1,
        width: "3rem",
        padding: "0",
        borderRadius: "50%",
      });
    }
  }, [isOpen]);
  return (
    <div
      id="chatbot"
      className={cn(
        `bg-black text-white border border-white fixed bottom-10 right-10 z-[99]  
     transition-all duration-700  overflow-hidden `,
        isOpen ? "" : "cursor-pointer flex items-center justify-center"
      )}
    >
      <div
        className={cn(
          isOpen
            ? "w-full flex flex-col gap-1 items-center  pb-2 pt-1 overflow-hidden"
            : "hidden"
        )}
      >
        <div className={"px-5"}>
          <CloseButton
            isOpen={isOpen}
            onClick={() => setIsOpen((open) => !open)}
          />
          <Header />
        </div>
        <Container />
      </div>
      <span
        onClick={() => setIsOpen(true)}
        className={cn(
          "transition-opacity duration-500 w-full h-full justify-center items-center flex select-none cursor-pointer  ",
          isOpen ? " opacity-0 hidden" : "opacity-100"
        )}
      >
        {"?"}
      </span>
    </div>
  );
};

const Container = () => {
  const [userInput, setUserInput] = useState<string>("");
  const [messages, setMessages] = useState<MessagesContent[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const newMessages = [...messages, { role: "user", content: userInput }];
      setMessages(newMessages);
      const req = await fetch("/api/chatbot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages }),
      });
      const request = await req.json();
      console.log(request);
      setMessages((messages) => [
        ...messages,
        { role: "assistant", content: request.message },
      ]);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      setUserInput("");
    }
  };

  // get Data
  useEffect(() => {
    const getFirstChat = async () => {
      const req = await fetch("/api/chatbot");
      const request = await req.json();
      setMessages(request.messages);
    };
    getFirstChat();
  }, []);

  // useEffect(() => {
  //   if (messages[messages.length - 1]?.role == "assistant") {
  //     typeEffect(messages[messages.length - 1]?.content);
  //   }
  // }, [messages]);
  return (
    <>
      <div
        className={
          "w-full h-[24rem] px-3 chatbot-scroll-ui overflow-y-scroll relative"
        }
      >
        {/* isinya */}
        {messages &&
          messages.map((item, index) => (
            <div className="pb-3 py-3 flex flex-col gap-1" key={index}>
              <div
                className={cn(
                  item.role === "user" ? "self-end" : "self-start",
                  "w-fit bg-gray-500 rounded-md px-4 py-1 text-white relative"
                )}
              >
                <div
                  style={{ clipPath: "polygon(70% 0, 42% 50%, 100% 20%)" }}
                  className={cn(
                    item.role === "user"
                      ? "size-5   bg-gray-500 absolute -bottom-4  -right-1 -scale-x-100"
                      : "size-5   bg-gray-500 absolute -bottom-4  -left-1"
                  )}
                ></div>
                <ReactMarkdown>{item.content}</ReactMarkdown>
              </div>
            </div>
          ))}
        {loading && <Tailspin size="30" stroke="5" speed="0.9" color="white" />}
      </div>
      {/* inputnya */}
      <form className="w-[calc(100%-1rem)] flex bg-gray-600 rounded-full px-3   ">
        <Input
          value={userInput}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setUserInput(e.target.value)
          }
          className="w-full border-0 bg-transparent text-white 
             focus:outline-0 focus:ring-0 focus:border-0 focus:shadow-none"
        />

        <button
          type="submit"
          disabled={loading}
          className={"rounded-full "}
          onClick={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          {loading ? (
            <Square
              size="20"
              stroke="5"
              strokeLength="0.25"
              bgOpacity="0.1"
              speed="1.2"
              color="white"
            />
          ) : (
            <SendIcon />
          )}
        </button>
      </form>
    </>
  );
};

const Header = () => {
  return <div className={"font-press text-white"}>Chatbot</div>;
};

type MessagesContent = { role: string; content: string };

const CloseButton = (props: { onClick: () => void; isOpen: boolean }) => {
  const { onClick, isOpen } = props;
  return (
    <div
      onClick={(e) => {
        e.stopPropagation(); // cegah klik tembus parent
        onClick();
      }}
      className={cn(
        "transition-opacity duration-500 font-press text-red-600 select-none cursor-pointer absolute top-5 right-5 z-[99]",
        isOpen ? " opacity-100" : "opacity-0"
      )}
    >
      {"X"}
    </div>
  );
};

export default Chatbot;
