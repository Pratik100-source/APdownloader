import { useEffect, useState } from "react";
import heroImage from "../assets/hero.png";
import { GiHamburgerMenu } from "react-icons/gi";
import { Link } from "react-router-dom";

const supportedSites = ["YouTube", "Facebook", "Instagram", "TikTok", "Vimeo"];

export default function HomePage() {
  const [videoUrl, setVideoUrl] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const currentYear = new Date().getFullYear();

  function handleSubmit(event) {
    event.preventDefault();
    console.log("Video link submitted", videoUrl);
  }

  function closeMenu() {
    setMenuOpen(false);
  }

  useEffect(() => {
    if (!menuOpen) {
      document.body.style.overflow = "";
      return undefined;
    }

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#f7fbff] font-sans text-[#15232f] antialiased">
      <header className="sticky top-0 z-50 flex flex-wrap items-center justify-between gap-7 border-b border-[#19303e1a] bg-white/90 px-4 py-4 backdrop-blur-lg lg:px-[clamp(20px,5vw,72px)]">
        <a
          className="inline-flex items-center gap-2.5 text-[1.08rem] font-black text-[#132d40] no-underline"
          href="#home"
          aria-label="APDownloader home"
        >
          <span className="grid h-[42px] w-[42px] place-items-center rounded-lg bg-[#1c7c72] text-white shadow-[0_10px_26px_rgba(28,124,114,0.22)]">
            AP
          </span>
          <span className="text-base sm:text-[1.08rem]">Downloader</span>
        </a>

        <button
          className="ml-auto grid h-11 w-11 place-items-center gap-1 rounded-lg border border-[#dbe4ea] bg-white lg:hidden"
          type="button"
          onClick={() => setMenuOpen((current) => !current)}
          aria-controls="quick-actions"
          aria-expanded={menuOpen}
          aria-label="Toggle navigation menu"
        >
          <GiHamburgerMenu />
        </button>

        {menuOpen && (
          <div
            className="fixed inset-x-0 top-[77px] z-40 h-[calc(100vh_-_77px)] bg-[#132d40]/35 backdrop-blur-[2px] lg:hidden"
            aria-hidden="true"
          />
        )}

        <nav
          className={`fixed right-0 top-[77px] z-50 flex h-[calc(100vh_-_77px)] w-[min(320px,calc(100vw_-_32px))] flex-col items-stretch gap-2.5 overflow-y-auto border-l border-[#dbe4ea] bg-white p-4 shadow-[-18px_20px_48px_rgba(24,43,58,0.16)] transition-transform duration-300 lg:static lg:z-auto lg:h-auto lg:w-auto lg:translate-x-0 lg:flex-row lg:items-center lg:justify-end lg:overflow-visible lg:border-0 lg:bg-transparent lg:p-0 lg:shadow-none ${
            menuOpen ? "translate-x-0" : "translate-x-[105%]"
          }`}
          id="quick-actions"
          aria-label="Quick actions"
        >
          <a
            className="flex min-h-12 items-center justify-start rounded-lg px-3.5 font-extrabold text-[#435565] no-underline hover:bg-[#eef7f4] hover:text-[#132d40] lg:min-h-10 lg:px-3"
            href="#contact"
            onClick={closeMenu}
          >
            Contact us
          </a>
          <a
            className="flex min-h-12 items-center justify-start rounded-lg px-3.5 font-extrabold text-[#435565] no-underline hover:bg-[#eef7f4] hover:text-[#132d40] lg:min-h-10 lg:px-3"
            href="#about"
            onClick={closeMenu}
          >
            What is APDownloader
          </a>
          <Link
            className="flex min-h-12 cursor-pointer items-center justify-start rounded-lg border-0 bg-transparent px-3.5 text-left font-extrabold text-[#435565] no-underline hover:bg-[#eef7f4] hover:text-[#132d40] lg:min-h-10 lg:px-3"
            to="/login"
            onClick={closeMenu}
          >
            Login
          </Link>
          <Link
            className="flex min-h-12 cursor-pointer items-center justify-start rounded-lg border-0 bg-[#17202a] px-3.5 text-left font-extrabold text-white no-underline hover:bg-[#1c7c72] lg:min-h-10 lg:px-3"
            to="/signup"
            onClick={closeMenu}
          >
            Signup
          </Link>
        </nav>
      </header>

      <section
        className="mx-auto grid min-h-[calc(100vh_-_80px)] w-[min(1180px,calc(100%_-_40px))] items-center gap-[clamp(36px,6vw,82px)] py-16 lg:grid-cols-[minmax(0,1fr)_minmax(320px,460px)]"
        id="home"
      >
        <div className="max-w-[720px]">
          <p className="mb-4 text-[0.82rem] font-black uppercase tracking-[0.12em] text-[#c26a21]">
            Fast video downloader
          </p>
          <h1 className="m-0 text-[clamp(3rem,7vw,6.4rem)] leading-[0.96] tracking-normal text-[#132d40]">
            Download videos from a link in seconds.
          </h1>
          <p className="mt-6 max-w-[640px] text-[1.12rem] leading-[1.7] text-[#52616e]">
            Paste a public video URL, search for available formats, and prepare
            your download from one clean workspace.
          </p>

          <form
            className="mt-8 grid max-w-[760px] gap-2.5"
            onSubmit={handleSubmit}
          >
            <label
              className="text-[0.95rem] font-black text-[#263746]"
              htmlFor="video-link"
            >
              Video link
            </label>
            <div className="grid gap-2.5 rounded-lg border border-[#cfdbe3] bg-white p-2 shadow-[0_18px_44px_rgba(24,43,58,0.12)] sm:grid-cols-[1fr_132px]">
              <input
                className="min-h-[52px] w-full rounded-md border-0 px-3.5 text-[#17202a] outline-none"
                id="video-link"
                type="url"
                value={videoUrl}
                onChange={(event) => setVideoUrl(event.target.value)}
                placeholder="Paste your video link here"
                required
              />
              <button
                className="min-h-[52px] cursor-pointer rounded-md border-0 bg-[#1c7c72] font-black text-white hover:bg-[#15655d]"
                type="submit"
              >
                Search
              </button>
            </div>
          </form>

          <div
            className="mt-5 flex flex-wrap gap-2.5"
            aria-label="Supported platforms"
          >
            {supportedSites.map((site) => (
              <span
                className="inline-flex min-h-[34px] items-center rounded-full border border-[#dbe4ea] bg-white/80 px-3 text-sm font-extrabold text-[#52616e]"
                key={site}
              >
                {site}
              </span>
            ))}
          </div>
        </div>

        <div
          className="grid min-h-[360px] grid-rows-[auto_1fr_auto] overflow-hidden rounded-lg border border-[#17202a1a] bg-white shadow-[0_24px_80px_rgba(24,43,58,0.18)] lg:min-h-[520px]"
          aria-label="Download preview"
        >
          <div className="flex gap-2 border-b border-[#e5edf2] bg-[#f7fbff] p-4">
            <span className="h-3 w-3 rounded-full bg-[#ff9f43]" />
            <span className="h-3 w-3 rounded-full bg-[#1c7c72]" />
            <span className="h-3 w-3 rounded-full bg-[#7a8a9a]" />
          </div>
          <div className="relative m-[18px] grid place-items-center overflow-hidden rounded-lg bg-[#132d40]">
            <img
              className="absolute inset-0 h-full w-full object-cover opacity-70"
              src={heroImage}
              alt=""
              aria-hidden="true"
            />
            <div className="absolute inset-0 bg-[#132d40]/45" />
            <div
              className="relative h-[74px] w-[74px] scale-[0.52] rounded-full bg-white shadow-[0_18px_42px_rgba(0,0,0,0.22)] [clip-path:polygon(0_0,100%_50%,0_100%)]"
              aria-hidden="true"
            />
          </div>
          <div className="grid gap-3 p-[18px]">
            <div className="flex min-h-[58px] items-center justify-between gap-4 rounded-lg border border-[#e5edf2] bg-[#f9fcfd] px-4">
              <strong className="text-[#132d40]">1080p MP4</strong>
              <span className="text-sm font-black text-[#1c7c72]">Ready</span>
            </div>
            <div className="flex min-h-[58px] items-center justify-between gap-4 rounded-lg border border-[#e5edf2] bg-[#f9fcfd] px-4">
              <strong className="text-[#132d40]">Audio MP3</strong>
              <span className="text-sm font-black text-[#1c7c72]">
                Available
              </span>
            </div>
          </div>
        </div>
      </section>

      <section
        className="mx-auto grid w-[min(1180px,calc(100%_-_40px))] gap-[clamp(28px,5vw,72px)] border-t border-[#dbe4ea] py-[76px] lg:grid-cols-[minmax(260px,0.8fr)_minmax(320px,1fr)]"
        id="about"
      >
        <div>
          <p className="mb-4 text-[0.82rem] font-black uppercase tracking-[0.12em] text-[#c26a21]">
            What is APDownloader?
          </p>
          <h2 className="m-0 text-[clamp(2rem,4vw,3.5rem)] leading-[1.05] tracking-normal text-[#132d40]">
            A simple place to turn video links into downloadable files.
          </h2>
        </div>
        <p className="m-0 text-[1.08rem] leading-[1.8] text-[#52616e]">
          APDownloader helps users paste a video URL, find supported download
          options, and choose the format that fits their needs. The frontend is
          built around the core workflow: paste a link, search, review formats,
          and download when the backend service is connected.
        </p>
      </section>

      <section
        className="mx-auto grid w-[min(1180px,calc(100%_-_40px))] gap-[18px] pb-[76px] lg:grid-cols-3"
        aria-label="APDownloader features"
      >
        <article className="min-h-[190px] rounded-lg border border-[#dbe4ea] bg-white p-6">
          <span className="font-black text-[#c26a21]">01</span>
          <h3 className="mb-2.5 mt-6 text-[1.28rem] font-bold text-[#132d40]">
            Paste any public link
          </h3>
          <p className="m-0 leading-[1.6] text-[#637180]">
            Start with a URL from a supported video platform.
          </p>
        </article>
        <article className="min-h-[190px] rounded-lg border border-[#dbe4ea] bg-white p-6">
          <span className="font-black text-[#c26a21]">02</span>
          <h3 className="mb-2.5 mt-6 text-[1.28rem] font-bold text-[#132d40]">
            Choose the format
          </h3>
          <p className="m-0 leading-[1.6] text-[#637180]">
            Prepare video or audio options when the downloader API responds.
          </p>
        </article>
        <article className="min-h-[190px] rounded-lg border border-[#dbe4ea] bg-white p-6">
          <span className="font-black text-[#c26a21]">03</span>
          <h3 className="mb-2.5 mt-6 text-[1.28rem] font-bold text-[#132d40]">
            Keep it organized
          </h3>
          <p className="m-0 leading-[1.6] text-[#637180]">
            Account features can save downloads and sync history later.
          </p>
        </article>
      </section>

      <section
        className="mx-auto mb-16 flex w-[min(1180px,calc(100%_-_40px))] flex-col items-start justify-between gap-7 rounded-lg bg-[#132d40] p-[34px] text-white lg:flex-row lg:items-center"
        id="contact"
      >
        <div>
          <h2 className="m-0 text-[clamp(1.7rem,3vw,2.5rem)] leading-[1.05] tracking-normal text-white">
            Need help with a link?
          </h2>
          <p className="mt-2.5 text-white/80">
            Contact APDownloader support for platform questions or account help.
          </p>
        </div>
        <a
          className="inline-flex min-h-12 items-center justify-center whitespace-nowrap rounded-lg bg-[#ff9f43] px-[18px] font-black text-[#17202a] no-underline"
          href="mailto:support@apdownloader.com"
        >
          Contact us
        </a>
      </section>

      <footer className="border-t border-[#dbe4ea] bg-white">
        <div className="mx-auto grid w-[min(1180px,calc(100%_-_40px))] gap-10 py-10 md:grid-cols-[1.3fr_1fr_1fr]">
          <div>
            <a
              className="inline-flex items-center gap-2.5 text-[1.08rem] font-black text-[#132d40] no-underline"
              href="#home"
              aria-label="APDownloader home"
            >
              <span className="grid h-10 w-10 place-items-center rounded-lg bg-[#1c7c72] text-white">
                AP
              </span>
              <span>APDownloader</span>
            </a>
            <p className="mt-4 max-w-[380px] leading-[1.7] text-[#637180]">
              A clean frontend for pasting video links, finding download
              options, and keeping downloads easy to manage.
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-black uppercase tracking-[0.12em] text-[#132d40]">
              Quick links
            </h3>
            <div className="grid gap-3">
              <a
                className="font-bold text-[#52616e] no-underline hover:text-[#1c7c72]"
                href="#home"
              >
                Downloader
              </a>
              <a
                className="font-bold text-[#52616e] no-underline hover:text-[#1c7c72]"
                href="#about"
              >
                What is APDownloader
              </a>
              <a
                className="font-bold text-[#52616e] no-underline hover:text-[#1c7c72]"
                href="#contact"
              >
                Contact us
              </a>
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-black uppercase tracking-[0.12em] text-[#132d40]">
              Account
            </h3>
            <div className="grid gap-3">
              <Link
                className="w-fit cursor-pointer border-0 bg-transparent p-0 text-left font-bold text-[#52616e] no-underline hover:text-[#1c7c72]"
                to="/login"
              >
                Login
              </Link>
              <Link
                className="w-fit cursor-pointer border-0 bg-transparent p-0 text-left font-bold text-[#52616e] no-underline hover:text-[#1c7c72]"
                to="/signup"
              >
                Signup
              </Link>
              <a
                className="font-bold text-[#52616e] no-underline hover:text-[#1c7c72]"
                href="mailto:support@apdownloader.com"
              >
                support@apdownloader.com
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-[#edf2f5]">
          <div className="mx-auto flex w-[min(1180px,calc(100%_-_40px))] flex-col items-start justify-between gap-2 py-5 text-sm font-bold text-[#637180] sm:flex-row sm:items-center">
            <p className="m-0">
              © {currentYear} APDownloader. All rights reserved.
            </p>
            <p className="m-0">Made by Pratik with ❤️</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
