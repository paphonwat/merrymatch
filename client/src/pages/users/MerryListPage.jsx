import { useState, useEffect } from "react";
import axios from "axios";
import RedHearticon from "/assets/merrylist-image/red-heart.png";
import GroupHearticon from "/assets/merrylist-image/group-heart.png";
import Locationicon from "/assets/merrylist-image/location.png";
import Chaticon from "/assets/merrylist-image/chat.png";
import Vectoricon from "/assets/merrylist-image/vector.png";
import WhiteHearticon from "/assets/merrylist-image/white-heart.png";
import Footer from "../../components/homepage/Footer";
import { useAuth } from "../../contexts/authentication";
import useMatching from "../../hooks/useMatching";

function MerryListPage() {
  const { state } = useAuth();
  const userId = state && state.user ? state.user.id : null;
  // Helper function to calculate age from date of birth
  const calculateAge = (dateOfBirth) => {
    const dob = new Date(dateOfBirth);
    const diffMs = Date.now() - dob.getTime();
    const ageDt = new Date(diffMs);
    return Math.abs(ageDt.getUTCFullYear() - 1970);
  };
  const [merryList, setMerryList] = useState([]);
  const getMerryLists = async () => {
    try {
      const result = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/merry-list/${userId}`
      );
      //setMerryList(result.data);
      console.log(result.data.data);
      setMerryList(result.data.data);
    } catch (error) {
      console.error("Failed to fetch potential matches:", error);
    }
  };
  const {
    availableClicksToday,
    maxDailyQuota,
    addMerry,
    undoMerry,
    getPotentialMatches,
  } = useMatching(userId);

  useEffect(() => {
    getMerryLists();
  }, [userId]);

  useEffect(() => {
    getPotentialMatches();
  }, [userId]);

  return (
    <>
      <section className="w-[375px] min-[320px]:w-auto h-auto flex flex-col items-center gap-[40px] pt-[90px] bg-[#FCFCFE] font-Nunito mx-auto lg:w-screen lg:gap-[80px] lg:pt-[160px]">
        <article className="w-full h-auto flex flex-col items-center gap-[40px] lg:w-[933px]">
          <section className="w-[343px] h-[305px] flex flex-col gap-[16px] lg:w-[933px] lg:h-[209px] lg:gap-[24px]">
            <header className="w-[343px] h-[109px] flex flex-col gap-[8px] lg:w-[933px] lg:h-[87px]">
              <p className="w-[343px] h-[21px] text-[14px] leading-[21px] text-[#7B4429] font-semibold lg:w-[933px] lg:h-[21px]">
                MERRY LIST
              </p>
              <h2 className="w-[343px] h-[80px] font-bold text-[#A62D82] text-[32px] leading-[40px] lg:w-[933px] lg:h-[58px] lg:text-[46px] lg:leading-[57.5px] lg:font-extrabold">
                Let’s know each other <br className="lg:hidden" /> with Merry!
              </h2>
            </header>
            <section className="w-[343px] h-[156px] flex flex-col gap-[16px]  lg:w-[933px] lg:h-[98px] lg:flex-row lg:gap-[350px]">
              <article className="w-[343px] h-[98px] flex flex-row gap-[16px] lg:w-[416px] lg:h-[98px]">
                <div className="w-[163.5px] h-[98px] rounded-2xl border border-[#F1F2F6] pt-[20px] pr-[24px] pb-[20px] pl-[24px] flex flex-col gap-[4px] bg-[#FFFFFF] lg:w-[200px] lg:h-[98px]">
                  <section className="w-[57px] h-[30px] flex flex-row gap-[4px]">
                    <h4 className="w-[29px] h-[30px] font-bold text-[24px] leading-[30px] text-[#C70039]">
                      16
                    </h4>
                    <img
                      src={RedHearticon}
                      className="w-[23px] h-[20px] mt-[5px] ml-[-2px]"
                      alt="red-heart-icon"
                    />
                  </section>
                  <label className="w-[115.5px] h-[24px] font-normal text-[16px] leading-[24px] text-[#646D89] lg:w-[152px]">
                    Merry to you
                  </label>
                </div>
                <div className="w-[163.5px] h-[98px] rounded-2xl border border-[#F1F2F6] pt-[20px] pr-[24px] pb-[20px] pl-[24px] flex flex-col gap-[4px] bg-[#FFFFFF] lg:w-[200px] lg:h-[98px]">
                  <section className="w-[57px] h-[30px] flex flex-row gap-[4px]">
                    <h4 className="w-[29px] h-[30px] font-bold text-[24px] leading-[30px] text-[#C70039]">
                      3
                    </h4>
                    <img
                      src={GroupHearticon}
                      className="w-[40px] h-[20px] mt-[5px] ml-[-6px]"
                      alt="group-heart-icon"
                    />
                  </section>
                  <label className="w-[152px] h-[24px] font-normal text-[16px] leading-[24px] text-[#646D89]">
                    Merry match
                  </label>
                </div>
              </article>

              <article className="w-[343px] h-[58px] lg:w-[517px] lg:h-[98px] bg-white">
                <section className="flex justify-end gap-[10px] mt-[16px] lg:w-[167px] lg:h-[24px] lg:flex-row lg:mt-[28px]">
                  <p className="w-[123px] h-[24px] font-normal text-[16px] leading-[24px] text-[#646D89]">
                    Merry limit today
                  </p>
                  <p className="w-[34px] h-[24px] font-normal text-[16px] leading-[24px] text-[#FF1659]">
                    {availableClicksToday}/{maxDailyQuota}
                  </p>
                </section>
                <p className="font-medium text-[12px] leading-[18px] text-right text-[#9AA1B9] mb-[28px] lg:w-[167px] lg:h-[18px]">
                  Reset in 12h...
                </p>
              </article>
            </section>
          </section>

          <section className="w-[375px] h-auto flex flex-col gap-[24px] mb-[41px] lg:w-[933px] lg:mb-[147px]">
            {merryList.map((list, index) => {
              return (
                <section
                  className="w-[375px] h-[334px] border-b border-[#E4E6ED] lg:w-[933px] lg:h-[238px]"
                  key={index}
                >
                  <article className="flex flex-col gap-[24px] lg:w-[674px] lg:h-[187px] lg:flex lg:flex-row lg:gap-[40px] mt-[16px] ml-[16px] lg:mb-[35px]">
                    <img
                      src={list.url}
                      className="hidden lg:block lg:w-[187px] lg:h-[187px] rounded-[24px]"
                      alt="merry-list-image"
                    />
                    {/* Mobile Responsive */}
                    <div className="flex flex-row gap-[71px] lg:hidden">
                      <img
                        src={list.url}
                        className="lg:hidden w-[104px] h-[104px] rounded-[24px]"
                        alt="merry-list-image"
                      />
                      <div className="lg:hidden w-[168px] h-[104px] flex flex-col gap-[24px] items-end lg:w-[176px]">
                        {list.status_1 === "match" ? (
                          <section className="w-[157.4px] h-[32px] rounded-full border flex flex-row gap-[4px] border-[#C70039] pl-[21px] pr-[11px] pt-[4px] pb-[4px]">
                            <img
                              src={GroupHearticon}
                              className="w-[20.4px] h-[12px] mt-[5px] ml-[-6px]"
                              alt="group-heart-icon"
                            />
                            <h3 className="w-[101px] h-[24px] font-extrabold text-[16px] leading-[24px] text-[#C70039]">
                              Merry Match!
                            </h3>
                          </section>
                        ) : (
                          <section className="w-[133px] h-[32px] rounded-full border flex flex-row gap-[4px] border-[#C8CCDB] pl-[15px] pr-[11px] pt-[4px] pb-[4px]">
                            <h3 className="w-[101px] h-[24px] font-normal text-[16px] leading-[24px] text-[#646D89]">
                              Not Match yet
                            </h3>
                          </section>
                        )}
                        <section className="w-[168px] lg:w-[176px] gap-[12px] h-[48px] flex flex-row lg:gap-[16px] justify-end">
                          <div className="w-[48px] h-[48px] rounded-2xl bg-[#FFFFFF] shadow-lg">
                            <img
                              src={Chaticon}
                              alt="chat-icon"
                              className="mt-[15.6px] ml-[14.4px]"
                            />
                          </div>
                          <div className="w-[48px] h-[48px] rounded-2xl bg-[#FFFFFF] shadow-lg">
                            <img
                              src={Vectoricon}
                              alt="vector-icon"
                              className="mt-[15.6px] ml-[12px] mb-[12px]"
                            />
                          </div>
                          <div className="w-[48px] h-[48px] rounded-2xl bg-[#C70039] shadow-lg">
                            <img
                              src={WhiteHearticon}
                              alt="white-heart-icon"
                              className="mt-[5px] ml-[3px]"
                            />
                          </div>
                        </section>
                      </div>
                    </div>
                    {/************************************************************************************************/}
                    <div className="w-[343px] h-[156px] flex flex-col gap-[8px] lg:w-[447px] lg:h-[182px] lg:gap-[24px]">
                      <section className="w-[343px] h-[30px] flex flex-row gap-[16px] lg:w-[447px]">
                        <div className="w-auto h-[30px] flex flex-row gap-[8px] font-bold text-[24px] leading-[30px]">
                          <h4 className="w-[110px] h-[30px] text-[#2A2E3F]">
                            {list.name}
                          </h4>
                          <h4 className="w-[29px] h-[30px] text-[#646D89]">
                            {calculateAge(list.date_of_birth)}
                          </h4>
                        </div>
                        <section className="w-[220px] h-[24px] flex flex-row gap-[6px] mt-[5px] mb-[5px] lg:w-[324px]">
                          <img
                            src={Locationicon}
                            className="w-[11.2px] h-[13.6px] mt-[4px] ml-[4px]"
                            alt="location-icon"
                          />
                          <p className="w-[198px] h-[24px] font-normal text-[16px] leading-[24px] text-[#646D89] lg:w-[302px]">
                            {list.city}, {list.location}
                          </p>
                        </section>
                      </section>
                      <section className="w-[343x] h-[128px] flex flex-col lg:w-[447px]">
                        <section className="w-[343px] h-[32px] flex flex-row font-normal text-[16px] leading-[24px] lg:w-[447px]">
                          <label className="w-[167px] h-[24px] text-[#2A2E3F]">
                            Sexual identities
                          </label>
                          <p className="w-[176px] h-[24px] text-[#646D89] lg:w-[280px]">
                            {list.sexual_identities}
                          </p>
                        </section>
                        <section className="w-[343px] h-[32px] flex flex-row font-normal text-[16px] leading-[24px] lg:w-[447px]">
                          <label className="w-[167px] h-[24px] text-[#2A2E3F]">
                            Sexual preferences
                          </label>
                          <p className="w-[176px] h-[24px] text-[#646D89] lg:w-[280px]">
                            {list.sexual_preferences}
                          </p>
                        </section>
                        <section className="w-[343px] h-[32px] flex flex-row font-normal text-[16px] leading-[24px] lg:w-[447px]">
                          <label className="w-[167px] h-[24px] text-[#2A2E3F]">
                            Racial preferences
                          </label>
                          <p className="w-[176px] h-[24px] text-[#646D89] lg:w-[280px]">
                            {list.racial_preferences}
                          </p>
                        </section>
                        <section className="w-[343px] h-[32px] flex flex-row font-normal text-[16px] leading-[24px] lg:w-[447px]">
                          <label className="w-[167px] h-[24px] text-[#2A2E3F]">
                            Meeting interests
                          </label>
                          <p className="w-[176px] h-[24px] text-[#646D89] lg:w-[280px]">
                            {list.meeting_interests}
                          </p>
                        </section>
                      </section>
                    </div>
                    {/* Desktop responsive */}
                    <div className="hidden w-[168px] h-[104px] flex-col gap-[24px] items-end lg:w-[176px] lg:flex">
                      {list.status_1 === "match" ? (
                        <section className="w-[157.4px] h-[32px] rounded-full border flex flex-row gap-[4px] border-[#C70039] pl-[21px] pr-[11px] pt-[4px] pb-[4px]">
                          <img
                            src={GroupHearticon}
                            className="w-[20.4px] h-[12px] mt-[5px] ml-[-6px]"
                            alt="group-heart-icon"
                          />
                          <h3 className="w-[101px] h-[24px] font-extrabold text-[16px] leading-[24px] text-[#C70039]">
                            Merry Match!
                          </h3>
                        </section>
                      ) : (
                        <section className="w-[133px] h-[32px] rounded-full border flex flex-row gap-[4px] border-[#C8CCDB] pl-[15px] pr-[11px] pt-[4px] pb-[4px]">
                          <h3 className="w-[101px] h-[24px] font-normal text-[16px] leading-[24px] text-[#646D89]">
                            Not Match yet
                          </h3>
                        </section>
                      )}
                      <section className="w-[168px] h-[48px] flex flex-row justify-end gap-[12px] lg:w-[176px] lg:gap-[16px]">
                        <button className="w-[48px] h-[48px] rounded-2xl bg-[#FFFFFF] shadow-lg">
                          <img
                            src={Chaticon}
                            alt="chat-icon"
                            className="mt-[4px] ml-[14.4px]"
                          />
                        </button>
                        <button className="w-[48px] h-[48px] rounded-2xl bg-[#FFFFFF] shadow-lg">
                          <img
                            src={Vectoricon}
                            alt="vector-icon"
                            className="mt-[15.6px] ml-[12px] mb-[12px]"
                          />
                        </button>

                        <button className="w-[48px] h-[48px] rounded-2xl bg-[#C70039] shadow-lg">
                          <img
                            src={WhiteHearticon}
                            alt="white-heart-icon"
                            className="mt-[5px] ml-[3px]"
                          />
                        </button>
                      </section>
                    </div>
                    {/************************************************************************************************/}
                  </article>
                </section>
              );
            })}
          </section>
        </article>
        <Footer />
      </section>
    </>
  );
}
export default MerryListPage;
