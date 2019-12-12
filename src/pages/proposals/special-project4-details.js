import React from 'react';

import { DetailsContainer, Content, Title } from './style';

const SpecialProject4Details = () => (
  <DetailsContainer>
    <Content special>
      <Title>
        <span>Project Ragnarok (full dissolution of DigixDAO)</span>
      </Title>
      <br />
      <h3 style={{ textDecoration: 'underline' }}>What is DigixDAO and its stated objective?</h3>
      <p>
        DigixDAO is a platform created to encourage the growth of projects and ecosystems around the
        Digix gold token (DGX) by leveraging the DGD community. DGD token holders are rewarded in
        DGX depending on their level of participation in the current Quarter of governance.
        Proposers who participate in the vision of building use cases for DGX can submit Projects on
        DigixDAO to obtain funding to do so.
      </p>
      <p>
        Digix has successfully created and launched DGX in 2018 and the DigixDAO platform in March
        2019. To date, there have been over 50 Projects submitted on DigixDAO to grow the DGX
        ecosystem, all of which are aimed at spurring demand for DGX. Some examples include Projects
        related to marketing, community management, uniswap liquidity projects, exchange
        integration, and on ramp off ramp projects. We at Digix would like to take this opportunity
        to thank everyone who participated in DigixDAO so far.
      </p>
      <p>
        To date, DigixDAO holds approximately 386,000 ETH to continue funding Projects to build up
        the DGX ecosystem. For those interested in submitting Projects, please head over to{' '}
        <a href="https://medium.com/digix/tagged/dao" target="_blank" rel="noopener noreferrer">
          https://medium.com/digix/tagged/dao
        </a>{' '}
        more information.
      </p>
      <h3 style={{ textDecoration: 'underline' }}>
        Why introduce a dissolution mechanism to DigixDAO?
      </h3>
      <p>
        Since the launch of DigixDAO, we have received a mix of positive and negative feedback from
        those who participated in DigixDAO. Among all the feedback we received, one recurring
        comment was for a mechanism for dissatisfied DGD token holders to make a clean break from
        DigixDAO. Although transferring ownership of DGDs has always been an option, other
        suggestions were put forward, ranging from a smart contract to allow DGD token holders to
        ‘burn’ their DGD in return for a proportion of ETH in DigixDAO, and even a call for a full
        dissolution of DigixDAO. We understand that participation in DigixDAO platform may not be
        for everyone, especially for those who cannot put aside time to actively vote and/or create
        Projects on DigixDAO.
      </p>
      <p>
        We have taken this feedback seriously and after deliberating possible solutions, we are
        proposing to introduce a dissolution mechanism to DigixDAO. In short, at the start of each
        DigixDAO Quarter, DGD token holders will be given the option of dissolution through a vote.
        Depending on the result of the vote, DigixDAO will either dissolve at the end of the current
        Quarter or continue for an additional Quarter.
      </p>
      <p>
        We hope that with the dissolution mechanism in place, DGD token holders who still believe in
        the vision of DigixDAO would step forward not only to vote against dissolution, but create
        Projects that will sway the opinion of dissolution supporters. However, if the dissolution
        vote passes, it will allow DGD token holders to dissociate themselves from DigixDAO in the
        fairest manner possible.
      </p>
      <h3 style={{ textDecoration: 'underline' }}>How will dissolution work?</h3>
      <p>
        As mentioned above, Digix will create a Project to call for a dissolution at the start of
        every DigixDAO Quarter. As such, the proposal will be launched as a special project, at the
        preset 40% quorum and 50% quota since DigixDAO was initialised.
      </p>
      <p>
        <i>
          UPDATE 1: Initially, we wanted to create a Digix Project for Project Ragnarok with only 1
          milestone and will have to go through the usual voting stages, which consist of Moderator
          Endorsement, Moderator Voting and Participant Voting. We have realised after discussing
          the technical implementation that this will not be a clean approach to the vote, as 1) it
          will dynamically upset the quorum during the claiming of the vote if projects were to be
          funded throughout the duration of this proposal.
        </i>
      </p>
      <p>
        If the dissolution vote passes, the current Quarter will be the final DigixDAO Quarter and
        DigixDAO will cease after the Locking Phase of the subsequent Quarter. Only Projects which
        pass their respective voting requirements in the current Quarter before the vote outcome is
        decided will be funded. After unlocking their DGD from DigixDAO, DGD token holders will be
        able to claim a pro-rated portion of remaining ETH in DigixDAO depending on the amount of
        DGD they hold. The amount of ETH available for claim would be taken as at the end of the
        current DigixDAO Quarter. The claiming process will be through a smart contract. Any further
        projects on the platform that is in any of the voting phases will be stopped.
      </p>
      <p>
        If the dissolution vote fails, DigixDAO will continue in the next Quarter and DGD token
        holders will be able to vote on dissolution again at the start of the subsequent Quarter.
      </p>
      <p>
        This announcement is not an announcement of a dissolution, but rather an invitation to the
        Digix community to provide any input they might have on the proposed dissolution mechanism.
        After all, DigixDAO was built for DGD token holders and DGD token holders should have a say
        on the continuity and direction of DigixDAO.
      </p>
      <h3 style={{ textDecoration: 'underline' }}>Digix’s stance on dissolution</h3>
      <p>
        We would like to make our position clear that Digix is against the dissolution. DigixDAO has
        enabled DGX to grow in ways that were only possible with the help from the DigixDAO
        community members. There were several Projects that have been successfully funded and on
        track to receiving funding that has aided in building up the brand awareness for the product
        and can be seen at{' '}
        <a href="https://community.digix.global" target="_blank" rel="noopener noreferrer">
          https://community.digix.global
        </a>
      </p>
      <p>
        Due to our bias against dissolution, we will abstain from voting on any dissolution Project
        on DigixDAO. However, we will respect and adhere to the collective opinion DGD holders based
        on the result of each dissolution vote.
      </p>
      <h3 style={{ textDecoration: 'underline' }}>
        Will DGX and Digix remain if the dissolution proposal passes?
      </h3>
      <p>
        Yes. DigixDAO is a platform created by Digix, and the core business of asset tokenization
        and the DGX gold tokens will remain even if dissolution occurs.
      </p>
      <p>
        What will only deprecate is a platform that can fund volunteer projects around the Digix
        ecosystem via DigixDAO.
      </p>
      <p>
        If this proposal passes, DGD holders will be entitled to a pro-rated redistribution of the
        remaining ETH in DigixDAO.
      </p>
      <p>
        DGD holders are able to exit DigixDAO with a pro rate refund of the ETH remaining within the
        DigixDAO platform.
      </p>
      <h3 style={{ textDecoration: 'underline' }}>
        Can other projects be submitted while this proposal is in place?
      </h3>
      <p>
        Absolutely! For anyone interested in submitting ideas or projects to scale the DGX
        ecosystem, they are welcomed to do so. Please visit{' '}
        <a href="https://medium.com/digix/tagged/dao" target="_blank" rel="noopener noreferrer">
          https://medium.com/digix/tagged/dao
        </a>{' '}
        if you have an interest in submitting a proposal. This project is one of several projects
        would be available for voting on the governance platform. It is a feature improvement in
        providing more autonomy to DigixDAO and DGD holders as they continue to exercise their
        rights to vote on new projects.
      </p>
      <h3 style={{ textDecoration: 'underline' }}>
        What is the course of action if the dissolution proposal passes?
      </h3>
      <p>
        <ol>
          <li>
            All ETH in the DigixDAO Treasury (minus the 2 ETH collateral submitted by each Proposer
            per active project) from DigixDAO will be transferred to a DigixDAO Refund Contract
          </li>
          <li>
            All DGDs can be unlocked by the DGD holder in the start of the proceeding Digix quarter
            (end of Day 90 of any current quarter)
          </li>
          <li>
            DGD holders can also manually send a transaction on Ethereum using MyEtherWallet to
            unlock staked DGDs (end of Day 90 of any current quarter)
          </li>
          <li>
            The 2 ETH Collateral submitted by each proposer will be refunded directly to the
            proposer address
          </li>
          <li>
            DGD holders will need to submit two transactions on the Ethereum blockchain (that can be
            done on MyEtherWallet) to suicide DGDs for the withdrawal of the Pro Rated distribution
            of ETH from DigixDAO
          </li>
          <li>
            All projects that are currently funded or have unfunded milestones and/or ongoing review
            phases on the DigixDAO platform will cease to be funded or voted upon and stopped by the
            PRL
          </li>
          <li>There will no longer be any further Quarters on the DigixDAO platform</li>
          <li>There will no longer be any utility for DGDs</li>
          <li>
            There will no longer be any transaction fees that will be rewarded to DGD holders in the
            governance platform, as it will cease to exist
          </li>
        </ol>
      </p>
      <h3 style={{ textDecoration: 'underline' }}>Distribution Formula per DGD</h3>
      <p>
        <i>[ETH in DigixDAO Treasury -2ETH Collateral * Number of Active Projects] / Total DGDs</i>
      </p>
      <h3 style={{ textDecoration: 'underline' }}>Amount of Ether in DigixDAO Treasury</h3>
      <br />
      <table border="1">
        <tr>
          <th>ETH in DigixDAO Treasury (Addresses)</th>
          <td>
            <p>0x75ba02c5baf9cc3e9fe01c51df3cb1437e8690d4</p>
            <p>0x24626fd95ad815bab2136d6f91ca10562161cda3</p>
          </td>
        </tr>
        <tr>
          <th>Total DGDs</th>
          <td>
            <p>2000000</p>
          </td>
        </tr>
        <tr>
          <th>Number of Active Projects</th>
          <td>
            <p>
              All Projects - Archived Projects, found on{' '}
              <a href="https://community.digix.global" target="_blank" rel="noopener noreferrer">
                https://community.digix.global
              </a>
            </p>
          </td>
        </tr>
      </table>
      <p>
        <b>
          This proposal will be submitted as a draft on the digixDAO platform, and will be open for
          voting in the next governance quarter of DigixDAO.
        </b>
      </p>
      <h3 style={{ textDecoration: 'underline' }}>Dissolution Contract</h3>
      <p>
        <a
          href="https://github.com/DigixGlobal/acid-solidity"
          target="_blank"
          rel="noopener noreferrer"
        >
          This
        </a>{' '}
        contract will be deployed to the Ethereum blockchain if the vote passes.
      </p>
    </Content>
  </DetailsContainer>
);

export default SpecialProject4Details;
