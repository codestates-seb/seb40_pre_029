export default function Aside() {
  return (
    <div className="py-8 w-[32rem] max-xl:hidden">
      <div className="bg-emerald-50 border border-emerald-200 shadow-md rounded-lg mb-4">
        <div>
          <div className="px-5 py-3 bg-emerald-100 font-semibold text-gray-600 border-b border-emerald-200 rounded-t-lg">
            The Overflow Blog
          </div>
          <ul className="flex flex-col px-4 pt-2 pb-4">
            <a
              href="https://stackoverflow.blog/2022/11/03/multiple-assertions-per-test-are-fine/?cb=1&_ga=2.6209587.1222130010.1667784874-558483118.1664287184"
              target="_blank"
              rel="noreferrer"
              className="py-2">
              <li className="flex text-gray-700 leading-5">
                <span className="material-icons mr-3 text-lg text-slate-700 dark:bg-slate-900">edit</span>
                Stop requiring only one assertion per unit test: Multiple assertions are fine
              </li>
            </a>
            <a
              href="https://stackoverflow.blog/2022/11/04/going-from-engineer-to-entrepreneur-takes-more-than-just-good-code-ep-503/?cb=1&_ga=2.86470296.1222130010.1667784874-558483118.1664287184"
              target="_blank"
              rel="noreferrer"
              className="py-2">
              <li className="flex text-gray-700 leading-5">
                <span className="material-icons mr-3 text-lg text-slate-700 dark:bg-slate-900 ">edit</span>
                Going from engineer to entrepreneur takes more than just good code (Ep. 503){" "}
              </li>
            </a>
          </ul>
        </div>
        <div>
          <div className="px-5 py-3 bg-emerald-100 font-semibold text-gray-600 border-y border-emerald-200">
            Featured on Meta
          </div>
          <ul className="flex flex-col px-4 pt-2 pb-4">
            <a
              href="https://meta.stackexchange.com/questions/383022/the-2022-community-a-thon-has-begun?cb=1"
              target="_blank"
              rel="noreferrer"
              className="py-2">
              <li className="flex text-gray-700 leading-5">
                <span className="material-symbols-outlined mr-3 text-lg text-sky-700 dark:bg-slate-900 ">
                  chat_bubble
                </span>
                The 2022 Community-a-thon has begun!
              </li>
            </a>
            <a
              href="https://meta.stackexchange.com/questions/383026/mobile-app-infrastructure-being-decommissioned?cb=1"
              target="_blank"
              rel="noreferrer"
              className="py-2">
              <li className="flex text-gray-700 leading-5">
                <span className="material-symbols-outlined mr-3 text-lg text-sky-700 dark:bg-slate-900 ">
                  chat_bubble
                </span>
                Mobile app infrastructure being decommissioned
              </li>
            </a>
            <a
              href="https://meta.stackoverflow.com/questions/421038/the-ask-wizard-2022-has-graduated?cb=1"
              target="_blank"
              rel="noreferrer"
              className="py-2">
              <li className="flex text-gray-700 leading-5">
                <span className="material-icons mr-3 text-lg text-slate-700 dark:bg-slate-900">horizontal_split</span>
                The Ask Wizard (2022) has graduated
              </li>
            </a>
            <a
              href="https://meta.stackoverflow.com/questions/421213/2022-moderator-election-qa-question-collection?cb=1"
              target="_blank"
              rel="noreferrer"
              className="py-2">
              <li className="flex text-gray-700 leading-5">
                <span className="material-icons mr-3 text-lg text-slate-700 dark:bg-slate-900">horizontal_split</span>
                2022 Moderator Election Q&A – Question Collection{" "}
              </li>
            </a>
            <a
              href="https://meta.stackoverflow.com/questions/420897/staging-ground-workflow-canned-comments?cb=1"
              target="_blank"
              rel="noreferrer"
              className="py-2">
              <li className="flex text-gray-700 leading-5">
                <span className="material-icons mr-3 text-lg text-slate-700 dark:bg-slate-900">horizontal_split</span>
                Staging Ground Workflow: Canned Comments{" "}
              </li>
            </a>
            <a
              href="https://meta.stackoverflow.com/questions/419441/the-variations-tag-is-being-burninated?cb=1"
              target="_blank"
              rel="noreferrer"
              className="py-2">
              <li className="flex text-gray-700 leading-5">
                <span className="material-icons mr-3 text-lg text-slate-700 dark:bg-slate-900">horizontal_split</span>
                The [variations] tag is being burninated{" "}
              </li>
            </a>
          </ul>
        </div>
      </div>
      <div className="bg-white border border-slate-200 shadow-md rounded-lg">
        <div>
          <div className="px-5 pt-3 pb-4 bg-slate-100 font-medium text-gray-600 border-b border-slate-200 rounded-t-lg">
            Custom Filters
          </div>
          <a href="https://stackoverflow.com/questions?edited=true" target="_blank" rel="noreferrer">
            <div className="px-5 pt-3 pb-4 text-gray-600 rounded-b-lg text-sky-600">Create a custom filter</div>
          </a>
        </div>
      </div>
    </div>
  );
}
