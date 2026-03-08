import clsx from "clsx";
import svgPaths from "./svg-0xal16kjjm";
import imgImage128 from "figma:asset/d411d707e98eb5e36e5bc42f2e12a77a4c0e1edd.png";
import imgNetflix1 from "figma:asset/d22a8d28dbd716776d7964836d589381022709d9.png";
import imgPaypal1 from "figma:asset/f189957b21e7acf364b72cdc8de25e87053ee0e9.png";
import imgSpotify1 from "figma:asset/f9df58f3ffe35aaa123bc65353eac643527de970.png";
import imgVector from "figma:asset/12401d7ac392e966b0392df49c05ee7669075bc2.png";
import imgVector1 from "figma:asset/b7a778342d4a94db0d31843e70e042f13aa0f01a.png";
import imgImage151 from "figma:asset/83237b3cdb68e203187a53755f13a5e2c808b401.png";
import imgVector2 from "figma:asset/cf34af6ab1f8d39cdcd4df54699f6b370cc997b7.png";
import imgVector3 from "figma:asset/5d69acbafb2ad82efa2be537359cc34210e7e2f1.png";
type Wrapper4Props = {
  additionalClassNames?: string;
};

function Wrapper4({ children, additionalClassNames = "" }: React.PropsWithChildren<Wrapper4Props>) {
  return (
    <div className={clsx("absolute flex items-center justify-center", additionalClassNames)}>
      <div className="-scale-y-100 flex-none h-[611.913px] rotate-180 w-[1047.999px]">{children}</div>
    </div>
  );
}

function Wrapper3({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="relative size-full">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 953.295 492.81">
        {children}
      </svg>
    </div>
  );
}

function Wrapper2({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="relative size-full">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1048 611.913">
        {children}
      </svg>
    </div>
  );
}

function Wrapper1({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="absolute flex inset-[-105.7%_-2.13%_-90.53%_32.25%] items-center justify-center">
      <div className="-scale-y-100 flex-none h-[218.369px] rotate-[93.45deg] w-[663.481px]">
        <div className="relative size-full" data-name="Vector">
          {children}
        </div>
      </div>
    </div>
  );
}

function Wrapper({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="absolute flex inset-[-98.01%_55.57%_-98.22%_-25.45%] items-center justify-center">
      <div className="flex-none h-[218.369px] rotate-[86.55deg] w-[663.481px]">
        <div className="relative size-full" data-name="Vector">
          {children}
        </div>
      </div>
    </div>
  );
}
type Helper4Props = {
  additionalClassNames?: string;
};

function Helper4({ additionalClassNames = "" }: Helper4Props) {
  return (
    <div className={additionalClassNames}>
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 36.0001 5.86047">
        <g id="Group 5970">
          <circle cx="2.93023" cy="2.93023" fill="var(--fill-0, white)" id="Ellipse 46" r="2.93023" />
          <circle cx="12.9766" cy="2.93023" fill="var(--fill-0, white)" id="Ellipse 47" r="2.93023" />
          <circle cx="23.023" cy="2.93023" fill="var(--fill-0, white)" id="Ellipse 48" r="2.93023" />
          <circle cx="33.0699" cy="2.93023" fill="var(--fill-0, white)" id="Ellipse 49" r="2.93023" />
        </g>
      </svg>
    </div>
  );
}
type Helper3Props = {
  additionalClassNames?: string;
};

function Helper3({ additionalClassNames = "" }: Helper3Props) {
  return <Helper4 additionalClassNames={clsx("absolute h-[5.86px] top-[201px] w-[36px]", additionalClassNames)} />;
}
type Text1Props = {
  text: string;
  additionalClassNames?: string;
};

function Text1({ text, additionalClassNames = "" }: Text1Props) {
  return (
    <p className={clsx("absolute", additionalClassNames)}>
      <span className="leading-[1.465]">{`Valid Thru `}</span>
      <span className="font-['Sofia_Pro:Medium',sans-serif] leading-[1.465]">{text}</span>
    </p>
  );
}
type TextProps = {
  text: string;
  additionalClassNames?: string;
};

function Text({ text, additionalClassNames = "" }: TextProps) {
  return (
    <p className={clsx("absolute", additionalClassNames)}>
      <span className="leading-[1.465]">{text}</span>
      <span className="font-['Sofia_Pro:Medium',sans-serif] leading-[1.465]">{` 10/25`}</span>
    </p>
  );
}
type Helper2Props = {
  text: string;
  text1: string;
  text2: string;
  additionalClassNames?: string;
};

function Helper2({ text, text1, text2, additionalClassNames = "" }: Helper2Props) {
  return (
    <p className={clsx("absolute font-['Sofia_Pro:SemiBold',sans-serif] leading-[0] text-[0px] tracking-[-1.08px]", additionalClassNames)}>
      <span className="font-['Sofia_Pro:Regular',sans-serif] leading-[normal] text-[28px]">{text}</span>
      <span className="font-['Sofia_Pro:Medium',sans-serif] leading-[normal] text-[28px]">{text1}</span>
      <span className="font-['Sofia_Pro:Medium',sans-serif] leading-[normal] text-[22px] tracking-[-0.66px]">{text2}</span>
    </p>
  );
}

function ImageImage() {
  return (
    <div className="absolute inset-[73.68%_7.05%_16.67%_83.2%]">
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage151} />
    </div>
  );
}
type Helper1Props = {
  text: string;
  text1: string;
  text2: string;
  additionalClassNames?: string;
};

function Helper1({ text, text1, text2, additionalClassNames = "" }: Helper1Props) {
  return (
    <p className={clsx("-translate-x-full absolute font-['Sofia_Pro:SemiBold',sans-serif] leading-[0] left-[376.66px] text-[#23303b] text-[0px] text-right tracking-[1.26px]", additionalClassNames)}>
      <span className="font-['Sofia_Pro:Medium',sans-serif] leading-[1.465] text-[20px]">{text}</span>
      <span className="leading-[1.465] text-[20px]">{text1}</span>
      <span className="leading-[1.465] text-[9px]">{text2}</span>
    </p>
  );
}
type HelperProps = {
  text: string;
  text1: string;
  additionalClassNames?: string;
};

function Helper({ text, text1, additionalClassNames = "" }: HelperProps) {
  return (
    <p className={clsx("absolute font-['Sofia_Pro:SemiBold',sans-serif] leading-[0] left-[116.66px] text-[#b4b2c8] text-[0px] text-[14px]", additionalClassNames)}>
      <span className="leading-[1.465] text-[#a4a9ae]">{text}</span>
      <span className="leading-[1.465]">{` `}</span>
      <span className="leading-[1.465] text-[#456efe]">{text1}</span>
    </p>
  );
}

export default function Dashboard() {
  return (
    <div className="bg-white relative size-full" data-name="Dashboard">
      <p className="absolute font-['Sofia_Pro:SemiBold',sans-serif] leading-[normal] left-[169.66px] not-italic text-[#23303b] text-[26px] top-[40px] whitespace-nowrap">Fintech</p>
      <div className="absolute contents inset-[2.71%_82.09%_93.36%_6.93%]">
        <div className="absolute contents inset-[2.71%_82.09%_93.36%_6.93%]">
          <div className="absolute inset-[2.71%_82.56%_93.36%_6.93%] rounded-[50px]" data-name="image 128">
            <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[50px] size-full" src={imgImage128} />
          </div>
          <div className="absolute inset-[2.71%_82.09%_96.42%_15.57%]">
            <div className="absolute inset-[-7.5%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.5 11.5">
                <circle cx="5.75" cy="5.75" fill="var(--fill-0, #E73726)" id="Ellipse 35" r="5" stroke="var(--stroke-0, white)" strokeWidth="1.5" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute contents left-[29.66px] top-[731px]">
        <div className="absolute contents leading-[1.465] left-[29.66px] not-italic top-[731px] whitespace-nowrap">
          <p className="absolute font-['Sofia_Pro:SemiBold',sans-serif] left-[29.66px] text-[#23303b] text-[19px] top-[731px]">Schedule Payments</p>
          <p className="absolute font-['Sofia_Pro:Medium',sans-serif] left-[347.66px] text-[#a4a9ae] text-[14px] top-[734px]">View All</p>
        </div>
        <div className="absolute contents left-[29.66px] top-[774px]">
          <div className="absolute bg-white h-[81px] left-[29.66px] rounded-[10px] shadow-[1px_5px_40px_8px_rgba(110,117,136,0.07)] top-[774px] w-[369px]" />
          <div className="absolute contents left-[50.66px] top-[789px]">
            <div className="absolute contents left-[116.66px] not-italic top-[790px] whitespace-nowrap">
              <div className="absolute contents left-[116.66px] top-[790px]">
                <p className="absolute font-['Sofia_Pro:Medium',sans-serif] leading-[1.465] left-[116.66px] text-[#23303b] text-[16px] top-[790px] tracking-[-0.32px]">Netflix</p>
                <Helper text="Next Payment:" text1="12/04" additionalClassNames="top-[818px]" />
              </div>
              <Helper1 text="$" text1="1.00" text2="USD" additionalClassNames="text-[#202a34] top-[800px]" />
            </div>
            <div className="absolute left-[50.66px] size-[51px] top-[789px]" data-name="netflix 1">
              <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgNetflix1} />
            </div>
          </div>
        </div>
        <div className="absolute contents left-[29.66px] top-[868px]">
          <div className="absolute bg-white h-[81px] left-[29.66px] rounded-[10px] shadow-[1px_5px_40px_8px_rgba(110,117,136,0.07)] top-[868px] w-[369px]" />
          <div className="absolute contents left-[50.66px] top-[883px]">
            <div className="absolute contents left-[116.66px] not-italic top-[884px] whitespace-nowrap">
              <div className="absolute contents left-[116.66px] top-[884px]">
                <p className="absolute font-['Sofia_Pro:Medium',sans-serif] leading-[1.465] left-[116.66px] text-[#23303b] text-[16px] top-[884px] tracking-[-0.32px]">Paypal</p>
                <p className="absolute font-['Sofia_Pro:SemiBold',sans-serif] leading-[0] left-[116.66px] text-[#b4b2c8] text-[0px] text-[14px] top-[912px]">
                  <span className="leading-[1.465] text-[#a4a9ae]">Next Payment:</span>
                  <span className="leading-[1.465] text-[#456efe]">{` 14/04`}</span>
                </p>
              </div>
              <Helper1 text="$" text1="3.50" text2="USD" additionalClassNames="top-[894px]" />
            </div>
            <div className="absolute left-[50.66px] size-[51px] top-[883px]" data-name="paypal 1">
              <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgPaypal1} />
            </div>
          </div>
        </div>
        <div className="absolute contents left-[29.66px] top-[962px]">
          <div className="absolute bg-white h-[81px] left-[29.66px] rounded-[10px] shadow-[1px_5px_40px_8px_rgba(110,117,136,0.07)] top-[962px] w-[369px]" />
          <div className="absolute contents left-[51.66px] top-[977px]">
            <div className="absolute contents left-[116.66px] not-italic top-[978px] whitespace-nowrap">
              <div className="absolute contents left-[116.66px] top-[978px]">
                <p className="absolute font-['Sofia_Pro:Medium',sans-serif] leading-[1.465] left-[116.66px] text-[#23303b] text-[16px] top-[978px] tracking-[-0.32px]">Spotify</p>
                <Helper text="Next Payment:" text1="13/04" additionalClassNames="top-[1006px]" />
              </div>
              <Helper1 text="$" text1="10.00" text2="USD" additionalClassNames="top-[988px]" />
            </div>
            <div className="absolute h-[51px] left-[51.66px] top-[977px] w-[49px]" data-name="spotify 1">
              <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgSpotify1} />
            </div>
          </div>
        </div>
      </div>
      <div className="absolute contents left-[29.66px] top-[369.2px]">
        <p className="absolute font-['Sofia_Pro:SemiBold',sans-serif] leading-[normal] left-[29.66px] not-italic text-[#23303b] text-[20px] top-[369.2px] tracking-[-0.6px] whitespace-nowrap">Quick Actions</p>
        <div className="absolute contents left-[184.66px] top-[406.2px]">
          <div className="absolute bg-white h-[134px] left-[184.66px] rounded-[10px] shadow-[1px_5px_40px_8px_rgba(110,117,136,0.07)] top-[406.2px] w-[141px]" />
          <div className="absolute contents left-[228.66px] top-[430.2px]">
            <div className="absolute contents left-[228.66px] top-[430.2px]">
              <div className="absolute contents left-[228.66px] top-[430.2px]">
                <p className="absolute font-['Sofia_Pro:SemiBold',sans-serif] inset-[43.6%_33.96%_55%_53.43%] leading-[normal] not-italic text-[#202a34] text-[16px] whitespace-nowrap">Pay Bill</p>
                <div className="absolute contents left-[230.66px] top-[430.2px]">
                  <div className="absolute contents left-[230.66px] top-[430.2px]">
                    <div className="absolute bg-[#4b78fe] left-[230.66px] opacity-15 rounded-[5px] shadow-[8px_7px_48px_3px_rgba(0,0,0,0.09)] size-[50px] top-[430.2px]" />
                  </div>
                  <div className="absolute inset-[38.75%_37.66%_59.21%_56.91%]">
                    <div className="absolute inset-[-3.21%_-3.22%]">
                      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24.7664 24.8298">
                        <g id="Group 7764">
                          <path d={svgPaths.p3535ae00} id="Vector" stroke="var(--stroke-0, #456EFE)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                          <path d={svgPaths.pa728c00} id="Vector_2" stroke="var(--stroke-0, #456EFE)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                          <path d={svgPaths.pec756c0} id="Vector_3" stroke="var(--stroke-0, #456EFE)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                        </g>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute contents left-[339.66px] top-[406.2px]">
          <div className="absolute bg-white h-[134px] left-[339.66px] rounded-[10px] shadow-[1px_5px_40px_8px_rgba(110,117,136,0.07)] top-[406.2px] w-[141px]" />
          <div className="absolute contents left-[361.66px] top-[430px]">
            <div className="absolute contents left-[361.66px] top-[430px]">
              <div className="absolute contents left-[361.66px] top-[430px]">
                <p className="absolute font-['Sofia_Pro:SemiBold',sans-serif] inset-[43.6%_-7.4%_55%_84.5%] leading-[normal] not-italic text-[#202a34] text-[16px] whitespace-nowrap">Bank to Bank</p>
                <div className="absolute contents left-[386px] top-[430px]">
                  <div className="absolute bg-[rgba(164,169,174,0.15)] left-[386px] rounded-[5px] size-[50px] top-[430px]" />
                  <div className="absolute inset-[38.78%_1.6%_59.21%_93.46%]">
                    <div className="absolute inset-[-3.25%_-3.55%]">
                      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22.6435 24.5521">
                        <g id="Group 7765">
                          <path d="M3.38176 10.4267V19.9338" id="Vector" stroke="var(--stroke-0, #8E949A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                          <path d="M8.67496 19.9024V10.4267" id="Vector_2" stroke="var(--stroke-0, #8E949A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                          <path d="M13.9682 10.4267V19.9024" id="Vector_3" stroke="var(--stroke-0, #8E949A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                          <path d="M19.2511 19.9338V10.4267" id="Vector_4" stroke="var(--stroke-0, #8E949A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                          <path d={svgPaths.p3e796540} id="Vector_5" stroke="var(--stroke-0, #8E949A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                          <path d={svgPaths.p1d05ac00} id="Vector_6" stroke="var(--stroke-0, #8E949A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                        </g>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute contents left-[29.66px] top-[406.2px]">
          <div className="absolute contents left-[29.66px] top-[406.2px]">
            <div className="absolute bg-white h-[128.796px] left-[29.66px] rounded-[10px] shadow-[1px_5px_24px_8px_rgba(110,117,136,0.07)] top-[406.2px] w-[141px]" />
          </div>
          <div className="absolute contents left-[42.66px] top-[429.08px]">
            <p className="absolute font-['Sofia_Pro:SemiBold',sans-serif] inset-[43.28%_63.16%_55.37%_9.97%] leading-[normal] not-italic text-[#202a34] text-[16px]">Money Transfer</p>
            <div className="absolute contents left-[76px] top-[429.08px]">
              <div className="absolute bg-[#13c999] h-[48.058px] left-[76px] opacity-15 rounded-[5px] shadow-[8px_7px_48px_3px_rgba(0,0,0,0.09)] top-[429.08px] w-[50px]" />
              <div className="absolute inset-[38.57%_73.94%_59.41%_21.03%]">
                <div className="absolute inset-[-3.23%_-3.48%]">
                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 23.0406 24.7287">
                    <g id="Group 7763">
                      <path d={svgPaths.p3cf1a200} id="Vector" stroke="var(--stroke-0, #13C999)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                      <path d={svgPaths.p2d746b80} id="Vector_2" stroke="var(--stroke-0, #13C999)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                      <path d="M11.521 8.69358V9.90836" id="Vector_3" stroke="var(--stroke-0, #13C999)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                      <path d="M11.521 17.3765V18.5913" id="Vector_4" stroke="var(--stroke-0, #13C999)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                      <path d={svgPaths.p3e73d500} id="Vector_5" stroke="var(--stroke-0, #13C999)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                      <path d={svgPaths.p30c74600} id="Vector_6" stroke="var(--stroke-0, #13C999)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                    </g>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute contents left-[29.66px] top-[565.6px]">
        <p className="absolute font-['Sofia_Pro:SemiBold',sans-serif] leading-[normal] left-[29.66px] not-italic text-[#23303b] text-[20px] top-[565.6px] tracking-[-0.6px] whitespace-nowrap">Services</p>
        <div className="absolute contents left-[30px] top-[605px]">
          <div className="absolute bg-[rgba(164,169,174,0.15)] h-[75px] left-[30px] rounded-[10px] top-[605px] w-[76px]" />
          <div className="absolute contents inset-[54.93%_81.78%_42.79%_13.32%]">
            <div className="absolute inset-[54.93%_81.78%_42.79%_13.32%]">
              <div className="absolute inset-[-2.88%_-3.58%]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22.4741 27.5306">
                  <g id="Group 7762">
                    <path d="M0.879957 22.163H21.5345" id="Vector" stroke="var(--stroke-0, #456EFE)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                    <path d={svgPaths.p2825b780} id="Vector_2" stroke="var(--stroke-0, #456EFE)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                    <path d={svgPaths.p1b52c300} id="Vector_3" stroke="var(--stroke-0, #456EFE)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                    <path d="M11.2489 6.06539V16.7181" id="Vector_4" stroke="var(--stroke-0, #456EFE)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                  </g>
                </svg>
              </div>
            </div>
          </div>
          <p className="absolute font-['Sofia_Pro:SemiBold',sans-serif] inset-[60.49%_77.42%_38.38%_9.03%] leading-[normal] not-italic text-[#8e949a] text-[13px] whitespace-nowrap">Recharge</p>
        </div>
        <div className="absolute contents left-[120px] top-[605px]">
          <div className="absolute contents left-[120px] top-[605px]">
            <div className="absolute bg-[rgba(164,169,174,0.15)] h-[75px] left-[120px] rounded-[10px] top-[605px] w-[76px]" />
            <div className="absolute inset-[55.02%_60.39%_42.93%_34.11%]">
              <div className="absolute inset-[-3.19%_-3.18%]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 25.0524 25.0005">
                  <g id="Group 7770">
                    <path d={svgPaths.p20e695c0} id="Vector" stroke="var(--stroke-0, #456EFE)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                    <path d={svgPaths.p24da2900} id="Vector_2" stroke="var(--stroke-0, #456EFE)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                    <path d={svgPaths.p35c07d80} id="Vector_3" stroke="var(--stroke-0, #456EFE)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                    <path d={svgPaths.p14c8f180} id="Vector_4" stroke="var(--stroke-0, #456EFE)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                  </g>
                </svg>
              </div>
            </div>
            <p className="absolute font-['Sofia_Pro:SemiBold',sans-serif] inset-[60.49%_57.79%_38.38%_31.7%] leading-[normal] not-italic text-[#8e949a] text-[13px] whitespace-nowrap">Charity</p>
          </div>
        </div>
        <div className="absolute contents left-[300px] top-[605px]">
          <div className="absolute contents left-[300px] top-[605px]">
            <div className="absolute bg-[#456efe] h-[75px] left-[300px] rounded-[10px] top-[605px] w-[76px]" />
            <div className="absolute inset-[55.11%_18.48%_42.97%_76.4%]">
              <div className="absolute inset-[-3.41%_-3.42%]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 23.42 23.4731">
                  <g id="Group 7772">
                    <path d={svgPaths.p3b2b3f80} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                    <path d={svgPaths.p169c6400} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                    <path d={svgPaths.p18442b00} id="Vector_3" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                    <path d={svgPaths.p924b80} id="Vector_4" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                  </g>
                </svg>
              </div>
            </div>
            <p className="absolute font-['Sofia_Pro:SemiBold',sans-serif] inset-[60.49%_17.6%_38.38%_75.62%] leading-[normal] not-italic text-[#8e949a] text-[13px] whitespace-nowrap">Gifts</p>
          </div>
        </div>
        <div className="absolute contents left-[209.66px] top-[605px]">
          <div className="absolute contents left-[209.66px] top-[605px]">
            <div className="absolute contents left-[209.66px] top-[605px]">
              <div className="absolute bg-[rgba(164,169,174,0.15)] h-[75px] left-[209.66px] rounded-[10px] top-[605px] w-[76px]" />
              <div className="absolute inset-[55.02%_39.44%_42.89%_54.97%]">
                <div className="absolute inset-[-3.14%]">
                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 25.42 25.42">
                    <g id="Group 7771">
                      <path d={svgPaths.p22ba7300} id="Vector" stroke="var(--stroke-0, #456EFE)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                      <path d={svgPaths.pae33700} id="Vector_2" stroke="var(--stroke-0, #456EFE)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                      <path d="M12.711 6.99187V8.38865" id="Vector_3" stroke="var(--stroke-0, #456EFE)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                      <path d="M12.711 17.0312V18.428" id="Vector_4" stroke="var(--stroke-0, #456EFE)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                      <path d="M19.4215 12.71H20.3163" id="Vector_5" stroke="var(--stroke-0, #456EFE)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                      <path d="M5.11496 12.71H6.00977" id="Vector_6" stroke="var(--stroke-0, #456EFE)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                      <path d={svgPaths.p1e083b00} id="Vector_7" stroke="var(--stroke-0, #456EFE)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                      <path d={svgPaths.p22ba7300} id="Vector_8" stroke="var(--stroke-0, #456EFE)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                      <path d={svgPaths.pae33700} id="Vector_9" stroke="var(--stroke-0, #456EFE)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                      <path d="M12.711 6.99187V8.38865" id="Vector_10" stroke="var(--stroke-0, #456EFE)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                      <path d="M12.711 17.0312V18.428" id="Vector_11" stroke="var(--stroke-0, #456EFE)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                      <path d="M19.4215 12.71H20.3163" id="Vector_12" stroke="var(--stroke-0, #456EFE)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                      <path d="M5.11496 12.71H6.00977" id="Vector_13" stroke="var(--stroke-0, #456EFE)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                      <path d={svgPaths.p1e083b00} id="Vector_14" stroke="var(--stroke-0, #456EFE)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                    </g>
                  </svg>
                </div>
              </div>
              <p className="absolute font-['Sofia_Pro:SemiBold',sans-serif] inset-[60.49%_38.63%_38.38%_54.36%] leading-[normal] not-italic text-[#8e949a] text-[13px] whitespace-nowrap">Loan</p>
            </div>
          </div>
        </div>
        <div className="absolute contents left-[390px] top-[605px]">
          <div className="absolute contents left-[390px] top-[605px]">
            <div className="absolute bg-[rgba(164,169,174,0.15)] h-[75px] left-[390px] rounded-[10px] top-[605px] w-[76px]" />
            <div className="absolute inset-[55.11%_-2.34%_42.97%_97.43%]">
              <div className="absolute inset-[-3.41%_-3.57%]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22.522 23.5002">
                  <g id="Group 7773">
                    <path d={svgPaths.p2703b400} id="Vector" stroke="var(--stroke-0, #456EFE)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                    <path d="M11.2607 2.66V0.75" id="Vector_2" stroke="var(--stroke-0, #456EFE)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                    <path d={svgPaths.p2934cdf0} id="Vector_3" stroke="var(--stroke-0, #456EFE)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                    <path d={svgPaths.pf0e1880} id="Vector_4" stroke="var(--stroke-0, #456EFE)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                  </g>
                </svg>
              </div>
            </div>
          </div>
          <p className="absolute font-['Sofia_Pro:SemiBold',sans-serif] inset-[60.49%_-6.81%_38.38%_93.03%] leading-[normal] not-italic text-[#8e949a] text-[13px] whitespace-nowrap">Insurance</p>
        </div>
      </div>
      <div className="absolute contents left-[29.66px] top-[101px]">
        <div className="absolute bg-[#456efe] h-[228px] left-[29.66px] overflow-clip rounded-[10px] top-[101px] w-[369px]">
          <Wrapper4 additionalClassNames="inset-[-78.23%_-86.28%_-90.16%_-97.73%]">
            <Wrapper2>
              <g id="Group 5965">
                <g filter="url(#filter0_i_1_980)" id="Vector">
                  <path d={svgPaths.p2007dd80} fill="url(#paint0_radial_1_980)" fillOpacity="0.15" />
                </g>
              </g>
              <defs>
                <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="570.488" id="filter0_i_1_980" width="1045.45" x="0.79744" y="44.4204">
                  <feFlood floodOpacity="0" result="BackgroundImageFix" />
                  <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
                  <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
                  <feOffset dx="-21" dy="4" />
                  <feGaussianBlur stdDeviation="25.5" />
                  <feComposite in2="hardAlpha" k2="-1" k3="1" operator="arithmetic" />
                  <feColorMatrix type="matrix" values="0 0 0 0 0.6125 0 0 0 0 0.698378 0 0 0 0 1 0 0 0 0.3 0" />
                  <feBlend in2="shape" mode="normal" result="effect1_innerShadow_1_980" />
                </filter>
                <radialGradient cx="0" cy="0" gradientTransform="translate(523.999 305.957) rotate(68.3007) scale(124.601 514.38)" gradientUnits="userSpaceOnUse" id="paint0_radial_1_980" r="1">
                  <stop stopColor="#75BBFC" />
                  <stop offset="1" stopColor="#75BBFC" stopOpacity="0" />
                </radialGradient>
              </defs>
            </Wrapper2>
          </Wrapper4>
          <Wrapper>
            <img alt="" className="absolute block max-w-none size-full" height="218.369" src={imgVector} width="663.481" />
          </Wrapper>
          <div className="absolute flex inset-[-57.02%_-88.43%_-59.13%_-69.92%] items-center justify-center">
            <div className="flex-none h-[492.81px] rotate-180 w-[953.295px]">
              <Wrapper3>
                <g id="Group 5963">
                  <path d={svgPaths.p111eccd0} fill="url(#paint0_radial_1_582)" fillOpacity="0.15" id="Vector" />
                  <path d={svgPaths.p455ac10} fill="url(#paint1_radial_1_582)" fillOpacity="0.15" id="Vector_2" />
                </g>
                <defs>
                  <radialGradient cx="0" cy="0" gradientTransform="translate(476.647 246.405) rotate(106.267) scale(122.205 460.866)" gradientUnits="userSpaceOnUse" id="paint0_radial_1_582" r="1">
                    <stop stopColor="#75BBFC" />
                    <stop offset="1" stopColor="#75BBFC" stopOpacity="0" />
                  </radialGradient>
                  <radialGradient cx="0" cy="0" gradientTransform="translate(416.784 247.137) rotate(106.267) scale(97.0445 365.978)" gradientUnits="userSpaceOnUse" id="paint1_radial_1_582" r="1">
                    <stop stopColor="#75BBFC" />
                    <stop offset="1" stopColor="#75BBFC" stopOpacity="0" />
                  </radialGradient>
                </defs>
              </Wrapper3>
            </div>
          </div>
          <Wrapper4 additionalClassNames="inset-[-1.75%_-77.78%_-166.63%_-106.23%]">
            <Wrapper2>
              <g id="Group 5966">
                <path d={svgPaths.p21e77280} fill="url(#paint0_radial_1_977)" fillOpacity="0.15" id="Vector" />
              </g>
              <defs>
                <radialGradient cx="0" cy="0" gradientTransform="translate(524 305.957) rotate(111.699) scale(124.601 514.38)" gradientUnits="userSpaceOnUse" id="paint0_radial_1_977" r="1">
                  <stop stopColor="#75BBFC" />
                  <stop offset="1" stopColor="#75BBFC" stopOpacity="0" />
                </radialGradient>
              </defs>
            </Wrapper2>
          </Wrapper4>
          <Wrapper1>
            <img alt="" className="absolute block max-w-none size-full" height="218.369" src={imgVector1} width="663.481" />
          </Wrapper1>
          <div className="absolute inset-[14.04%_7.05%_72.93%_82.38%]" data-name="Group">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 39 29.713">
              <g id="Group">
                <path d={svgPaths.pecc6e00} fill="var(--fill-0, #F8C74E)" id="Vector" />
                <path d={svgPaths.p23cf9600} fill="var(--fill-0, #E9AA42)" id="Vector_2" />
                <path d={svgPaths.p35f73a80} fill="var(--fill-0, #E9AA42)" id="Vector_3" />
                <path d={svgPaths.p1186a000} fill="var(--fill-0, #F8C74E)" id="Vector_4" />
                <path d={svgPaths.p2496ed00} fill="var(--fill-0, #F8C74E)" id="Vector_5" />
                <path d={svgPaths.p133f5f70} fill="var(--fill-0, #F8C74E)" id="Vector_6" />
                <path d={svgPaths.p8a604c0} fill="var(--fill-0, #F8C74E)" id="Vector_7" />
                <path d={svgPaths.p3048c000} fill="var(--fill-0, #F8C74E)" id="Vector_8" />
                <path d={svgPaths.p123ada00} fill="var(--fill-0, #F8C74F)" id="Vector_9" />
                <path d={svgPaths.p15390100} fill="var(--fill-0, #F8C74F)" id="Vector_10" />
                <path d={svgPaths.p13017700} fill="var(--fill-0, #F8C74F)" id="Vector_11" />
                <path d={svgPaths.p419ac80} fill="var(--fill-0, #F8C74F)" id="Vector_12" />
                <path d={svgPaths.p375dbb00} fill="var(--fill-0, #EAAB42)" id="Vector_13" />
              </g>
            </svg>
          </div>
          <ImageImage />
        </div>
        <div className="absolute contents left-[67.66px] not-italic text-white top-[132px] whitespace-nowrap">
          <Helper2 text="$" text1="4,228" text2=".76" additionalClassNames="left-[67.66px] top-[156px]" />
          <p className="absolute font-['Sofia_Pro:Light',sans-serif] leading-[normal] left-[67.66px] text-[14px] top-[132px] tracking-[0.28px]">Available Balance</p>
        </div>
        <div className="absolute contents font-['Sofia_Pro:Light',sans-serif] leading-[0] left-[68.66px] not-italic text-[12px] text-white top-[224px] whitespace-nowrap">
          <Text text="Valid From" additionalClassNames="left-[68.66px] top-[224px]" />
          <Text1 text="10/30" additionalClassNames="left-[176.66px] top-[224px]" />
        </div>
        <p className="absolute font-['Sofia_Pro:Regular',sans-serif] leading-[1.465] left-[67.66px] not-italic text-[12px] text-white top-[255px] whitespace-nowrap">Card Holder</p>
        <p className="absolute font-['Sofia_Pro:SemiBold',sans-serif] leading-[1.465] left-[68.66px] not-italic text-[18px] text-white top-[273px] whitespace-nowrap">Will Jonas</p>
        <div className="absolute contents left-[68.66px] top-[190px]">
          <p className="absolute font-['Sofia_Pro:Medium',sans-serif] leading-[1.465] left-[221.66px] not-italic text-[19px] text-white top-[190px] whitespace-nowrap">8635</p>
          <Helper3 additionalClassNames="left-[68.66px]" />
          <Helper3 additionalClassNames="left-[119.66px]" />
          <Helper3 additionalClassNames="left-[170.66px]" />
        </div>
      </div>
      <div className="absolute contents inset-[8.82%_-83.37%_71.27%_97.16%]">
        <div className="absolute bg-[#2dc688] inset-[8.82%_-83.37%_71.27%_97.16%] overflow-clip rounded-[10px]">
          <Wrapper4 additionalClassNames="inset-[-78.23%_-86.28%_-90.16%_-97.73%]">
            <Wrapper2>
              <g id="Group 5965">
                <g filter="url(#filter0_i_1_983)" id="Vector">
                  <path d={svgPaths.p1bb54c80} fill="url(#paint0_radial_1_983)" fillOpacity="0.15" />
                </g>
              </g>
              <defs>
                <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="570.488" id="filter0_i_1_983" width="1045.45" x="0.797443" y="44.4204">
                  <feFlood floodOpacity="0" result="BackgroundImageFix" />
                  <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
                  <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
                  <feOffset dx="-21" dy="4" />
                  <feGaussianBlur stdDeviation="25.5" />
                  <feComposite in2="hardAlpha" k2="-1" k3="1" operator="arithmetic" />
                  <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.1 0" />
                  <feBlend in2="shape" mode="normal" result="effect1_innerShadow_1_983" />
                </filter>
                <radialGradient cx="0" cy="0" gradientTransform="translate(523.999 305.957) rotate(68.3007) scale(124.601 514.38)" gradientUnits="userSpaceOnUse" id="paint0_radial_1_983" r="1">
                  <stop stopColor="white" />
                  <stop offset="1" stopColor="#00FF66" stopOpacity="0" />
                </radialGradient>
              </defs>
            </Wrapper2>
          </Wrapper4>
          <Wrapper>
            <img alt="" className="absolute block max-w-none size-full" height="218.369" src={imgVector2} width="663.481" />
          </Wrapper>
          <div className="absolute flex inset-[-57.02%_-88.43%_-59.13%_-69.92%] items-center justify-center">
            <div className="flex-none h-[492.81px] rotate-180 w-[953.295px]">
              <Wrapper3>
                <g id="Group 5963">
                  <path d={svgPaths.p111eccd0} fill="url(#paint0_radial_1_973)" fillOpacity="0.15" id="Vector" />
                  <path d={svgPaths.p20f86ba0} fill="url(#paint1_radial_1_973)" fillOpacity="0.15" id="Vector_2" />
                </g>
                <defs>
                  <radialGradient cx="0" cy="0" gradientTransform="translate(476.647 246.405) rotate(106.267) scale(122.205 460.866)" gradientUnits="userSpaceOnUse" id="paint0_radial_1_973" r="1">
                    <stop stopColor="white" />
                    <stop offset="1" stopColor="white" stopOpacity="0" />
                  </radialGradient>
                  <radialGradient cx="0" cy="0" gradientTransform="translate(416.784 247.137) rotate(106.267) scale(97.0445 365.978)" gradientUnits="userSpaceOnUse" id="paint1_radial_1_973" r="1">
                    <stop stopColor="white" />
                    <stop offset="1" stopColor="white" stopOpacity="0" />
                  </radialGradient>
                </defs>
              </Wrapper3>
            </div>
          </div>
          <Wrapper4 additionalClassNames="inset-[-1.75%_-77.78%_-166.63%_-106.23%]">
            <Wrapper2>
              <g id="Group 5966">
                <path d={svgPaths.pc150700} fill="url(#paint0_radial_1_1020)" fillOpacity="0.15" id="Vector" />
              </g>
              <defs>
                <radialGradient cx="0" cy="0" gradientTransform="translate(524 305.957) rotate(111.699) scale(124.601 514.38)" gradientUnits="userSpaceOnUse" id="paint0_radial_1_1020" r="1">
                  <stop stopColor="#00FF66" />
                  <stop offset="0.0001" stopColor="white" stopOpacity="0.673958" />
                  <stop offset="1" stopColor="#00FF66" stopOpacity="0" />
                </radialGradient>
              </defs>
            </Wrapper2>
          </Wrapper4>
          <Wrapper1>
            <img alt="" className="absolute block max-w-none size-full" height="218.369" src={imgVector3} width="663.481" />
          </Wrapper1>
          <div className="absolute inset-[14.04%_7.05%_72.93%_82.38%]" data-name="Group">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 38.9999 29.713">
              <g id="Group">
                <path d={svgPaths.pecc6e00} fill="var(--fill-0, #F8C74E)" id="Vector" />
                <path d={svgPaths.p23cf9600} fill="var(--fill-0, #E9AA42)" id="Vector_2" />
                <path d={svgPaths.p219b7f80} fill="var(--fill-0, #E9AA42)" id="Vector_3" />
                <path d={svgPaths.pf90a300} fill="var(--fill-0, #F8C74E)" id="Vector_4" />
                <path d={svgPaths.p2496ed00} fill="var(--fill-0, #F8C74E)" id="Vector_5" />
                <path d={svgPaths.p133f5f70} fill="var(--fill-0, #F8C74E)" id="Vector_6" />
                <path d={svgPaths.p8a604c0} fill="var(--fill-0, #F8C74E)" id="Vector_7" />
                <path d={svgPaths.p3048c000} fill="var(--fill-0, #F8C74E)" id="Vector_8" />
                <path d={svgPaths.p123ada00} fill="var(--fill-0, #F8C74F)" id="Vector_9" />
                <path d={svgPaths.p3cb7d780} fill="var(--fill-0, #F8C74F)" id="Vector_10" />
                <path d={svgPaths.p13017700} fill="var(--fill-0, #F8C74F)" id="Vector_11" />
                <path d={svgPaths.p419ac80} fill="var(--fill-0, #F8C74F)" id="Vector_12" />
                <path d={svgPaths.p375dbb00} fill="var(--fill-0, #EAAB42)" id="Vector_13" />
              </g>
            </svg>
          </div>
          <ImageImage />
        </div>
        <div className="absolute contents inset-[11.27%_-33.84%_84.19%_106.04%] not-italic text-white whitespace-nowrap">
          <Helper2 text="$" text1="4,228" text2=".76" additionalClassNames="inset-[13.36%_-31.51%_84.19%_106.04%]" />
          <p className="absolute font-['Sofia_Pro:Light',sans-serif] inset-[11.27%_-33.84%_87.51%_106.04%] leading-[normal] text-[14px] tracking-[0.28px]">Available Balance</p>
        </div>
        <div className="absolute contents font-['Sofia_Pro:Light',sans-serif] inset-[19.3%_-52.3%_79.13%_106.27%] leading-[0] not-italic text-[12px] text-white whitespace-nowrap">
          <Text text="Valid From" additionalClassNames="inset-[19.3%_-27.53%_79.13%_106.27%]" />
          <Text1 text="10/30" additionalClassNames="inset-[19.3%_-52.3%_79.13%_131.51%]" />
        </div>
        <p className="absolute font-['Sofia_Pro:Regular',sans-serif] inset-[22.01%_-21.93%_76.42%_106.04%] leading-[1.465] not-italic text-[12px] text-white whitespace-nowrap">Card Holder</p>
        <p className="absolute font-['Sofia_Pro:SemiBold',sans-serif] inset-[23.58%_-24.96%_74.15%_106.27%] leading-[1.465] not-italic text-[18px] text-white whitespace-nowrap">Will Jonas</p>
        <div className="absolute contents inset-[16.33%_-52.07%_81.22%_106.27%]">
          <p className="absolute font-['Sofia_Pro:Medium',sans-serif] inset-[16.33%_-52.07%_81.22%_142.02%] leading-[1.465] not-italic text-[19px] text-white whitespace-nowrap">8635</p>
          <Helper4 additionalClassNames="absolute inset-[17.29%_-14.68%_82.2%_106.27%]" />
          <Helper4 additionalClassNames="absolute inset-[17.29%_-26.6%_82.2%_118.19%]" />
          <Helper4 additionalClassNames="absolute inset-[17.29%_-38.52%_82.2%_130.1%]" />
        </div>
      </div>
      <div className="absolute contents left-[204.47px] top-[339.18px]">
        <div className="absolute bg-[#456efe] h-[4.622px] left-[204.47px] rounded-[50px] top-[339.18px] w-[12.134px]" />
        <div className="absolute bg-[rgba(164,169,174,0.25)] left-[218.91px] rounded-[50px] size-[4.622px] top-[339.18px]" />
      </div>
      <div className="absolute contents left-[352px] top-[30px]">
        <div className="absolute contents left-[352px] top-[30px]">
          <div className="absolute contents left-[352px] top-[30px]">
            <div className="absolute bg-[rgba(164,169,174,0.25)] left-[352px] rounded-[23.5px] size-[47px] top-[30px]" />
          </div>
        </div>
        <div className="absolute contents inset-[3.67%_9.73%_94.41%_85.51%]">
          <div className="absolute inset-[3.67%_10.07%_94.41%_85.51%]">
            <div className="absolute inset-[-3.41%_-3.96%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20.417 23.5">
                <g id="Group 7766">
                  <path d={svgPaths.p3ef0fb80} id="Vector" stroke="var(--stroke-0, #A3A8AC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                  <path d={svgPaths.p2ebadf80} id="Vector_2" stroke="var(--stroke-0, #A3A8AC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                  <path d={svgPaths.p10c97c80} id="Vector_3" stroke="var(--stroke-0, #A3A8AC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                  <path d={svgPaths.p305bc780} id="Vector_4" stroke="var(--stroke-0, #A3A8AC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                </g>
              </svg>
            </div>
          </div>
          <div className="absolute inset-[3.84%_9.73%_95.37%_88.17%]">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8.99369 9">
              <g id="Group 7727">
                <path d={svgPaths.p2a111d00} fill="var(--fill-0, #E73726)" id="Vector" />
              </g>
            </svg>
          </div>
        </div>
      </div>
      <div className="absolute contents left-0 top-[1052px]">
        <div className="-translate-x-1/2 absolute bottom-0 contents left-1/2">
          <div className="absolute bg-[#f9f9fb] h-[93px] left-0 shadow-[0px_11px_44px_19px_rgba(0,0,0,0.1)] top-[1052px] w-[428px]" />
          <div className="absolute contents inset-[94.77%_6.36%_2.97%_7.43%]">
            <div className="absolute contents inset-[94.77%_6.36%_2.97%_26.83%]">
              <div className="absolute contents inset-[94.77%_6.36%_2.97%_87.81%]" data-name="vuesax/linear/category">
                <div className="absolute inset-[94.77%_6.36%_2.97%_87.81%]" data-name="category">
                  <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24.9188 25.8417">
                    <g id="category">
                      <path d={svgPaths.pb433a40} id="Vector" stroke="var(--stroke-0, #8E949A)" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="1.5" />
                      <path d={svgPaths.p387cce80} id="Vector_2" stroke="var(--stroke-0, #8E949A)" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="1.5" />
                      <path d={svgPaths.p16cd1500} id="Vector_3" stroke="var(--stroke-0, #8E949A)" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="1.5" />
                      <path d={svgPaths.p2ff0de30} id="Vector_4" stroke="var(--stroke-0, #8E949A)" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="1.5" />
                      <path d={svgPaths.p3701db00} fill="var(--fill-0, #8E949A)" id="Vector_5" opacity="0" />
                    </g>
                  </svg>
                </div>
              </div>
              <div className="absolute inset-[94.93%_27.84%_3.14%_67.02%]">
                <div className="absolute inset-[-3.41%]">
                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 23.5 23.5102">
                    <g id="Group 7820">
                      <path d={svgPaths.p25dc9100} id="Vector" stroke="var(--stroke-0, #8E949A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                      <path d={svgPaths.pd13d300} id="Vector_2" stroke="var(--stroke-0, #8E949A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                      <path d={svgPaths.p8370800} id="Vector_3" stroke="var(--stroke-0, #8E949A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                      <path d="M0.75 22.7401H22.75" id="Vector_4" stroke="var(--stroke-0, #8E949A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                      <path d={svgPaths.p35912ba0} id="Vector_5" stroke="var(--stroke-0, #8E949A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                      <path d={svgPaths.p2e4c94a0} id="Vector_6" stroke="var(--stroke-0, #8E949A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                    </g>
                  </svg>
                </div>
              </div>
              <div className="absolute inset-[94.93%_48.17%_3.14%_46.69%]">
                <div className="absolute inset-[-3.41%]">
                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 23.5 23.5">
                    <g id="Group 7819">
                      <path d={svgPaths.p33377480} id="Vector" stroke="var(--stroke-0, #8E949A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                      <path d="M4.55078 11.75H18.9508" id="Vector_2" stroke="var(--stroke-0, #8E949A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                      <path d={svgPaths.p360d0980} id="Vector_3" stroke="var(--stroke-0, #8E949A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                      <path d={svgPaths.p3fd0c600} id="Vector_4" stroke="var(--stroke-0, #8E949A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                      <path d={svgPaths.p55803c0} id="Vector_5" stroke="var(--stroke-0, #8E949A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                      <path d={svgPaths.p3a3243c0} id="Vector_6" stroke="var(--stroke-0, #8E949A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                    </g>
                  </svg>
                </div>
              </div>
              <div className="absolute inset-[94.93%_69%_3.12%_26.83%]">
                <div className="absolute inset-[-3.36%_-4.21%]">
                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19.32 23.8014">
                    <g id="Group 7798">
                      <path d="M13.5456 7.76855H5.76563" id="Vector" stroke="var(--stroke-0, #8E949A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                      <path d={svgPaths.p33507400} id="Vector_2" stroke="var(--stroke-0, #8E949A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                      <path d={svgPaths.p286c9800} id="Vector_3" stroke="var(--stroke-0, #8E949A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                    </g>
                  </svg>
                </div>
              </div>
            </div>
            <div className="absolute inset-[94.94%_86.95%_3.07%_7.43%]">
              <div className="absolute inset-[-3.3%_-3.12%_0_-3.12%]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 25.5201 23.469">
                  <g id="Group 7792">
                    <g id="Vector">
                      <path d={svgPaths.p8a9a600} fill="var(--fill-0, #466EFA)" />
                      <path d={svgPaths.p8a9a600} stroke="var(--stroke-0, #466EF9)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                    </g>
                    <g id="Vector_2">
                      <path d={svgPaths.p235dee60} fill="var(--fill-0, #466EFA)" />
                      <path d={svgPaths.p235dee60} stroke="var(--stroke-0, #466EFA)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                    </g>
                    <path d={svgPaths.p3f76f200} fill="var(--fill-0, #F9F9FB)" id="Vector_3" />
                  </g>
                </svg>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute h-0 left-[29.69px] top-[1052.97px] w-[23.646px]">
          <div className="absolute inset-[-1px_0_0_0]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 23.6455 1">
              <line id="Line 18" stroke="var(--stroke-0, #466EFA)" x2="23.6455" y1="0.5" y2="0.5" />
            </svg>
          </div>
        </div>
        <div className="absolute left-[42.4px] size-[2.847px] top-[1114.53px]">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2.84668 2.84668">
            <circle cx="1.42334" cy="1.42334" fill="var(--fill-0, #466EFA)" id="Ellipse 196" r="1.42334" />
          </svg>
        </div>
      </div>
    </div>
  );
}