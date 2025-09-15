import Link from "next/link";

export default function Home() {
  return (
    <main className="flex-1">
      <section className="min-h-[calc(100vh-120px)] flex justify-center bg-[var(--hero-bg)]">
        <div className="max-w-[1080px] w-full flex flex-col justify-center">
          <p className="font-light">{"Hey, I'm"}</p>
          <h1 className="text-4xl font-bold text-[96px] my-[26px] linear-text">
            Ha Van Vinh
          </h1>
          <p className="font-light text-[18px]">
            {`I’m a web developer specializing in React, Next.js, and Node.js.
              I’m passionate about building optimized, intuitive, and modern applications with a strong focus on user experience.
              This portfolio showcases my projects, ideas, and development journey, reflecting my problem-solving skills and creative approach to coding.`}
          </p>
          <div className="mt-[194px] flex space-x-[8px]">
            <Link
              href="/"
              className="social-btn p-[2px] h-[55px] rounded-[5px] w-[200px] linear-border--blue"
            >
              <span className=" bg-[var(--background)] gap-[10px] w-full h-full rounded-[3px] flex justify-center items-center">
                <svg
                  width="20"
                  height="18"
                  viewBox="0 0 20 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1 0H19C19.2652 0 19.5196 0.105357 19.7071 0.292893C19.8946 0.48043 20 0.734784 20 1V17C20 17.2652 19.8946 17.5196 19.7071 17.7071C19.5196 17.8946 19.2652 18 19 18H1C0.734784 18 0.48043 17.8946 0.292893 17.7071C0.105357 17.5196 0 17.2652 0 17V1C0 0.734784 0.105357 0.48043 0.292893 0.292893C0.48043 0.105357 0.734784 0 1 0ZM10.06 8.683L3.648 3.238L2.353 4.762L10.073 11.317L17.654 4.757L16.346 3.244L10.06 8.683Z"
                    fill="currentColor"
                  />
                </svg>
                Send an email
              </span>
            </Link>

            <Link
              href={"https://github.com/VinHa28"}
              className="social-btn p-[2px] h-[55px] rounded-[5px] w-[200px] linear-border--red"
            >
              <span className="social-btn gap-[10px] bg-[var(--background)] w-full h-full rounded-[3px] flex justify-center items-center">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10 0C4.475 0 1.45954e-06 4.475 1.45954e-06 10C-0.00113276 12.0993 0.658815 14.1456 1.88622 15.8487C3.11362 17.5517 4.84615 18.8251 6.838 19.488C7.338 19.575 7.525 19.275 7.525 19.012C7.525 18.775 7.512 17.988 7.512 17.15C5 17.613 4.35 16.538 4.15 15.975C4.037 15.687 3.55 14.8 3.125 14.562C2.775 14.375 2.275 13.912 3.112 13.9C3.9 13.887 4.462 14.625 4.65 14.925C5.55 16.437 6.988 16.012 7.562 15.75C7.65 15.1 7.912 14.663 8.2 14.413C5.975 14.163 3.65 13.3 3.65 9.475C3.65 8.387 4.037 7.488 4.675 6.787C4.575 6.537 4.225 5.512 4.775 4.137C4.775 4.137 5.612 3.875 7.525 5.163C8.33906 4.93706 9.18017 4.82334 10.025 4.825C10.875 4.825 11.725 4.937 12.525 5.162C14.437 3.862 15.275 4.138 15.275 4.138C15.825 5.513 15.475 6.538 15.375 6.788C16.012 7.488 16.4 8.375 16.4 9.475C16.4 13.313 14.063 14.163 11.838 14.413C12.2 14.725 12.513 15.325 12.513 16.263C12.513 17.6 12.5 18.675 12.5 19.013C12.5 19.275 12.688 19.587 13.188 19.487C15.173 18.8168 16.8979 17.541 18.1199 15.8392C19.3419 14.1373 19.9994 12.0951 20 10C20 4.475 15.525 0 10 0Z"
                    fill="currentColor"
                  />
                </svg>
                Github
              </span>
            </Link>
            <Link
              href={"https://www.facebook.com/vanvinh.ha.52"}
              className="social-btn p-[2px] h-[55px] rounded-[5px] w-[200px] linear-border--purple-bold"
            >
              <span className="social-btn gap-[10px] bg-[var(--background)] w-full h-full rounded-[3px] flex justify-center items-center">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 48 48"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#clip0_17_61)">
                    <path
                      d="M24 0C10.7453 0 0 10.7453 0 24C0 35.255 7.74912 44.6995 18.2026 47.2934V31.3344H13.2538V24H18.2026V20.8397C18.2026 12.671 21.8995 8.8848 29.9194 8.8848C31.44 8.8848 34.0637 9.18336 35.137 9.48096V16.129C34.5706 16.0694 33.5866 16.0397 32.3645 16.0397C28.4294 16.0397 26.9088 17.5306 26.9088 21.4061V24H34.7482L33.4013 31.3344H26.9088V47.8243C38.7926 46.3891 48.001 36.2707 48.001 24C48 10.7453 37.2547 0 24 0Z"
                      fill="currentColor"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_17_61">
                      <rect width="48" height="48" fill="currentColor" />
                    </clipPath>
                  </defs>
                </svg>
                Facebook
              </span>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20">
        <h2 className="text-3xl font-semibold">About Me</h2>
      </section>

      <section className="py-20">
        <h2 className="text-3xl font-semibold">Projects</h2>
      </section>
    </main>
  );
}
