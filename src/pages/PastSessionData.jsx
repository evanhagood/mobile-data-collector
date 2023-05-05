import {
    currentSessionData,
    pastSessionData,
    editingPrevious,
    currentPageName,
    currentFormName,
    pastEntryIndex,
    sessionObject,
    notificationText,
} from '../utils/jotai';
import { useAtom, useSetAtom } from 'jotai';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function PastSessionData() {
    const [currentData, setCurrentData] = useAtom(currentSessionData);
    const [pastData, setPastData] = useAtom(pastSessionData);
    const [isEditingPrevious, setIsEditingPrevious] = useAtom(editingPrevious);
    const [currentForm, setCurrentForm] = useAtom(currentFormName);
    const [currentPage, setCurrentPage] = useAtom(currentPageName);
    const [entryIndex, setEntryIndex] = useAtom(pastEntryIndex);
    const setCurrentSessionObject = useSetAtom(sessionObject)
    const [isOpen, setIsOpen] = useState([]);
    const [openEntry, setOpenEntry] = useState();
    const setNotification = useSetAtom(notificationText);

    const liVariant = {
        open: {
            height: '430px',
        },
        closed: {
            height: '60px',
        },
    };

    const deleteSessionsBeforeToday = () => {
        const now = new Date();
        const nowDateCode = `${now.getDate()}${now.getMonth()}${now.getFullYear()}`;
        setPastData(
            pastData.filter((value) => {
                const sessionDate = new Date(value.sessionData.sessionEpochTime);
                const sessionDateCode = `${sessionDate.getDate()}${sessionDate.getMonth()}${sessionDate.getFullYear()}`;
                return (nowDateCode === sessionDateCode);
            })
        );
    };

    useEffect(() => {
        setIsOpen(new Array(pastData.length).fill(false));
        setPastData(pastData.sort((a, b) => b.sessionData.sessionEpochTime - a.sessionData.sessionEpochTime))
        // deleteSessionsBeforeToday();
    }, []);

    // console.log(isOpen)

    const getNumberCrittersRecorded = (critter) => {
        let count = 0;
        if (critter === 'arthropod') {
            for (const dataEntry of pastData[openEntry].sessionData[critter]) {
                for (const key in dataEntry.arthropodData) {
                    count += Number(dataEntry.arthropodData[key]);
                }
            }
        } else if (
            critter === 'amphibian' ||
            critter === 'lizard' ||
            critter === 'mammal' ||
            critter === 'snake'
        ) {
            for (const dataEntry of pastData[openEntry].sessionData[critter]) {
                count++;
            }
        }
        return count;
    };

    const container = {
        hidden: {
            opacity: 0,
            transition: {
                duration: 0.05,
            },
        },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.01,
            },
        },
    };

    const item = {
        hidden: {
            opacity: 0,
        },
        show: {
            opacity: 1,
        },
    };

    return (
        <motion.ul
            layout
            className="relative
        w-full
        flex
        flex-col
        items-center
        h-full
        max-h-[calc(100%-3em)]
        overflow-x-hidden 
        overflow-y-auto 
        scrollbar-thin 
        scrollbar-thumb-asu-maroon 
        scrollbar-thumb-rounded-full 
        rounded-lg 
      "
        >
            <h1 className="text-2xl underline underline-offset-8 font-bold">Session History</h1>
            {pastData.map((sessionEntry, index) => {
                const displayString = `${
                    new Intl.DateTimeFormat('en-US', {
                        dateStyle: 'short',
                        timeStyle: 'short'
                    }).format(new Date(sessionEntry.sessionData.sessionEpochTime))
                } - ${sessionEntry.sessionData.site}`
                return (
                    <motion.li
                        key={index}
                        className="bg-white border-2 border-asu-maroon m-2 rounded-xl w-5/6"
                        variants={liVariant}
                        initial={false}
                        animate={isOpen[index] ? 'open' : 'closed'}
                        onClick={() => {
                            setOpenEntry(index);
                            let array = new Array(pastData.length).fill(false);
                            array[index] = !isOpen[index];
                            setIsOpen(array);
                        }}
                        custom={index}
                    >
                        <motion.div className={!isOpen[index] ? 
                        'flex flex-row justify-around text-lg text-center items-center transition border-b-0 h-full'
                        :
                        'flex flex-row justify-around text-lg text-center items-center transition border-b-[1px] border-b-black'}>
                            <motion.p >Uploaded to server? {sessionEntry.uploaded ? '✔️' : '❌'}</motion.p>
                            <motion.p >{displayString}</motion.p>
                        </motion.div>
                        <AnimatePresence mode='popLayout'>
                            {isOpen[index] && (
                                <motion.div
                                    variants={container}
                                    initial="hidden"
                                    animate="show"
                                    exit="hidden"
                                    className="flex flex-col items-center"
                                >
                                    <motion.p
                                        className="text-lg"
                                        variants={item}
                                    >{`Project: ${pastData[openEntry].sessionData.project}`}</motion.p>
                                    <motion.p
                                        className="text-lg"
                                        variants={item}
                                    >{`Site: ${pastData[openEntry].sessionData.site}`}</motion.p>
                                    <motion.p
                                        className="text-lg"
                                        variants={item}
                                    >{`Array: ${pastData[openEntry].sessionData.array}`}</motion.p>
                                    <motion.div className="rounded-3xl" variants={item}>
                                        <table className="table table-compact glass rounded-3xl">
                                            <thead className="border-b-[3px] border-slate-200">
                                                <tr>
                                                    <th className="bg-transparent rounded-tl-3xl text-center">
                                                        Critter
                                                    </th>
                                                    <th className="bg-transparent rounded-tr-3xl text-center">
                                                        Number
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody className="text-center">
                                                <EntryTableRow
                                                    entryType={'Arthropod'}
                                                    entryNumber={getNumberCrittersRecorded(
                                                        'arthropod'
                                                    )}
                                                />
                                                <EntryTableRow
                                                    entryType={'Amphibian'}
                                                    entryNumber={getNumberCrittersRecorded(
                                                        'amphibian'
                                                    )}
                                                />
                                                <EntryTableRow
                                                    entryType={'Lizard'}
                                                    entryNumber={getNumberCrittersRecorded(
                                                        'lizard'
                                                    )}
                                                />
                                                <EntryTableRow
                                                    entryType={'Mammal'}
                                                    entryNumber={getNumberCrittersRecorded(
                                                        'mammal'
                                                    )}
                                                />
                                                <EntryTableRow
                                                    entryType={'Snake'}
                                                    entryNumber={getNumberCrittersRecorded(
                                                        'snake'
                                                    )}
                                                />
                                            </tbody>
                                        </table>
                                    </motion.div>
                                    <motion.button
                                        className="text-white bg-asu-maroon mt-2 text-lg rounded-xl p-2"
                                        variants={item}
                                        onClick={() => {
                                            const currentMonthDay = `${
                                                new Date().getMonth()
                                            }${
                                                new Date().getDate()
                                            }`
                                            const sessionMonthDay = `${
                                                new Date(pastData[openEntry].sessionData.sessionEpochTime).getMonth()
                                            }${
                                                new Date(pastData[openEntry].sessionData.sessionEpochTime).getDate()
                                            }`
                                            console.log(currentMonthDay, sessionMonthDay)
                                            if (currentMonthDay === sessionMonthDay) {
                                                setIsEditingPrevious(true);
                                                setCurrentData(pastData[openEntry].sessionData);
                                                setCurrentSessionObject(pastData[openEntry].sessionObj)
                                                setCurrentPage('Collect Data');
                                                setCurrentForm('New Data Entry');
                                                setEntryIndex(index);
                                            } else {
                                                setNotification('Can only edit sessions from today')
                                                setEntryIndex(-1)
                                            }
                                        }}
                                    >
                                        Reopen this session?
                                    </motion.button>
                                </motion.div>
                            )}
                        </AnimatePresence>
                        <div className="h-20"/>
                    </motion.li>
                );
            })}
        </motion.ul>
    );
}

const UploadStatusIndicator = ({session}) => {
    if (session.uploaded) {
        return (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-10 h-10 stroke-green-600"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 12.75l6 6 9-13.5"
                />
            </svg>
        ) 
    } else {
        return (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-10 h-10 stroke-red-600"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                />
            </svg>
        )
    }
}

const EntryTableRow = ({ entryType, entryNumber }) => {
    return (
        <tr>
            <td className="bg-transparent text-lg p-1">{entryType}</td>
            <td className="bg-transparent text-lg p-1">{entryNumber}</td>
        </tr>
    );
};
