// global imports
import { FC } from "react";

// local imports
import { CommunityCardProps } from "@/interfaces";


export const CommunityCard: FC<CommunityCardProps> = ({ photoUrl, type, title, locations, link }) => {
    return (
        <div className="h-fit grid text-textPrimary border border-strokeSoft rounded-xl">
            <div style={{ backgroundImage: `url(${photoUrl})`, backgroundSize: "cover" }} className="h-36 relative rounded-t-xl">
                <p className="absolute left-2 bottom-2 py-0.5 px-1.5 bg-black bg-opacity-60 text-sm text-white font-medium rounded-full">{type}</p>
            </div>
            <div className="bg-white py-4 px-2 text-base rounded-b-xl">
                <p className="font-medium">{title}</p>
                <p className="text-textSecondary">{locations.join(", ")}</p>
                <p role="button" className="underline text-green-400">{link}</p>
            </div>
        </div>
    );
}
