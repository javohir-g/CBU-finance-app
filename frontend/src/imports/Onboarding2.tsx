import clsx from "clsx";
import imgCard16 from "figma:asset/7b00de278c68290ce7a9a8c3529f40413b574dfd.png";
import imgCard18 from "figma:asset/d60e55e0cf684844f6280201e2d032e23cce38da.png";
import imgCard15 from "figma:asset/f7d55d07091e6892f605e8ad14c978e6782b5cc1.png";
import imgCard13 from "figma:asset/d5282bd123f59134d2aab5ebe4ec70abbc60772e.png";
type WrapperProps = {
  additionalClassNames?: string;
};

function Wrapper({ children, additionalClassNames = "" }: React.PropsWithChildren<WrapperProps>) {
  return (
    <div style={{ "--transform-inner-width": "1200", "--transform-inner-height": "22" } as React.CSSProperties} className={clsx("absolute flex h-[368.812px] items-center justify-center w-[283.18px]", additionalClassNames)}>
      {children}
    </div>
  );
}
type HelperProps = {
  additionalClassNames?: string;
};

function Helper({ additionalClassNames = "" }: HelperProps) {
  return (
    <div style={{ "--transform-inner-width": "1200", "--transform-inner-height": "22" } as React.CSSProperties} className={clsx("absolute flex h-[433.716px] items-center justify-center w-[283.463px]", additionalClassNames)}>
      <div className="flex-none rotate-[-133.62deg] scale-y-87 skew-x-30">
        <div className="blur-[35.708px] h-[205.318px] opacity-19 relative rounded-[71.069px] w-[326.988px]">
          <div aria-hidden="true" className="absolute inset-0 pointer-events-none rounded-[71.069px]">
            <img alt="" className="absolute max-w-none object-cover rounded-[71.069px] size-full" src={imgCard18} />
            <div className="absolute bg-black inset-0 rounded-[71.069px]" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Onboarding() {
  return (
    <div className="bg-[#23303b] overflow-clip relative rounded-[35px] size-full" data-name="Onboarding 2">
      <div className="absolute contents left-[34px] top-[848px]">
        <div className="absolute h-0 left-[34px] top-[848px] w-[94.5px]">
          <div className="absolute inset-[-2.5px_-2.65%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 99.5 5">
              <g id="Group 2216">
                <path d="M77.5 2.5H97" id="Vector 7" stroke="var(--stroke-0, #4F5962)" strokeLinecap="round" strokeWidth="5" />
                <path d="M2.5 2.5H61" id="Vector 6" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeWidth="5" />
              </g>
            </svg>
          </div>
        </div>
      </div>
      <div className="absolute bg-[#456efe] h-[55px] left-[296px] rounded-[10px] top-[820px] w-[101px]" />
      <p className="-translate-x-1/2 absolute font-['SF_Pro:Medium',sans-serif] font-[510] h-[25px] leading-[1.465] left-[346.5px] text-[20px] text-center text-white top-[835px] tracking-[1.2px] w-[59px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        Start
      </p>
      <p className="absolute font-['Sofia_Pro:Medium',sans-serif] leading-[1.465] left-[34px] not-italic text-[#8e949a] text-[18px] top-[735px] w-[359px]">A convenient way to manage your money securely from mobile device.</p>
      <div className="absolute font-['Sofia_Pro:Regular',sans-serif] leading-[0] left-[34px] not-italic text-[35px] text-white top-[574px] w-[340px]">
        <p className="leading-[1.365] mb-0">Manage Your</p>
        <p>
          <span className="leading-[1.365]">{`Payments with `}</span>
          <span className="leading-[1.365] text-[#456efe]">mobile banking</span>
        </p>
      </div>
      <div className="absolute contents left-[-48.09px] top-[-29px]">
        <Wrapper additionalClassNames="left-[192.91px] top-[243px]">
          <div className="flex-none rotate-30 scale-y-87 skew-x-30">
            <div className="h-[205.318px] relative w-[326.988px]" data-name="Card 16">
              <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgCard16} />
            </div>
          </div>
        </Wrapper>
        <Helper additionalClassNames="left-[123.91px] top-[352px]" />
        <Helper additionalClassNames="left-[-4.09px] top-[88px]" />
        <Wrapper additionalClassNames="left-[52.32px] top-[99.54px]">
          <div className="-rotate-30 -skew-x-30 flex-none scale-y-87">
            <div className="h-[205.318px] relative w-[326.988px]" data-name="Card 15">
              <img alt="" className="absolute backdrop-blur-[77.626px] inset-0 max-w-none object-cover pointer-events-none size-full" src={imgCard15} />
            </div>
          </div>
        </Wrapper>
        <div className="absolute flex h-[307.652px] items-center justify-center left-[-48.09px] top-[-29px] w-[236.22px]" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "22" } as React.CSSProperties}>
          <div className="flex-none rotate-30 scale-y-87 skew-x-30">
            <div className="h-[171.27px] relative w-[272.763px]" data-name="Card 13">
              <img alt="" className="absolute backdrop-blur-[77.626px] inset-0 max-w-none object-cover pointer-events-none size-full" src={imgCard13} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}