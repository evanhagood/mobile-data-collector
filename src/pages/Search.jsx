import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../components/Button';
import TextInput from '../components/TextInput';

export default function Search() {
    const [search, setSearch] = useState('');
    const [searchIsOpen, setSearchIsOpen] = useState(false);

    const historyContainerVariant = {
        hidden: {
            opacity: 0,
        },
        visible: {
            opacity: 1,
        },
    };

    const historyVariant = {
        hidden: {
            scale: 0,
            y: '50%',
        },
        visible: {
            scale: [0, 1],
            y: ['60%', '0%'],
            transition: {
                type: 'spring',
                duration: 0.25,
            },
        },
    };

    return (
        <motion.div>
            <TextInput
                prompt="Search Database:"
                placeholder="Example: ASTI+A1B2"
                value={search}
                setValue={setSearch}
            />
            <Button
                prompt="Search"
                clickHandler={() => {
                    setSearchIsOpen(true);
                }}
            />
            <AnimatePresence>
                {searchIsOpen && (
                    <motion.div
                        className="absolute h-screen w-screen top-0 left-0 bg-black/20 z-50"
                        variants={historyContainerVariant}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                    >
                        <PortraitTable
                            historyVariant={historyVariant}
                            setSearchIsOpen={setSearchIsOpen}
                        />
                        <LandscapeTable setSearchIsOpen={setSearchIsOpen} />
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}

const PortraitTable = ({ historyVariant, setSearchIsOpen }) => {
    return (
        <motion.div
            className="absolute h-[calc(100%-2.5rem)] w-[calc(100%-2.5rem)] shadow-2xl top-0 left-0 bg-white border-2 border-asu-maroon rounded-2xl m-5 p-1 flex flex-col items-center landscape:hidden"
            variants={historyVariant}
            initial="hidden"
            animate="visible"
            exit="hidden"
        >
            <h1 className="text-3xl">Results</h1>
            <button
                className="border-2 text-xl border-asu-maroon rounded-xl w-1/2 px-4 py-1 mb-2 mt-auto"
                onClick={() => setSearchIsOpen(false)}
            >
                Close
            </button>
        </motion.div>
    );
};

const LandscapeTable = ({ setSearchIsOpen }) => (
    <motion.div className="absolute h-[calc(100%-2.5rem)] w-[calc(100%-2.5rem)] shadow-2xl top-0 left-0 bg-white border-2 border-asu-maroon rounded-2xl m-5 p-1 flex flex-col items-center portrait:hidden">
        <h1 className="text-3xl">Results</h1>
        <button
            className="border-2 text-xl border-asu-maroon rounded-xl w-1/2 px-4 py-1 mb-2 mt-auto"
            onClick={() => setSearchIsOpen(false)}
        >
            Close
        </button>
    </motion.div>
);
