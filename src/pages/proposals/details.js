import React from 'react';
import { DetailsContainer, ShortDescription, TrackActivity, Details, SubTitle } from './style';

export default class ProjectDetails extends React.Component {
  render() {
    return (
      <DetailsContainer>
        <ShortDescription>
          <p>
            Lorem ipsum dolor sit amet, an augue vivendo referrentur usu, paulo zril epicurei id
            per. Et vis tantas iriure quaestio. Ut habemus similique eum, quas voluptaria mei cu.
            Vel ne zril gloriatur complectitur. No stet percipit nominati vis. Everti pertinax
            assentior vis ea.
          </p>
          <p>
            Has id utamur saperet insolens, suas augue inani et pro. Mea ex augue omittantur, dicat
            postulant voluptaria an mei. Ad simul luptatum sea, quo ex corrumpit reformidans,
            feugait denique no vix. Dicta evertitur reformidans ei quo, ad quo doming oblique
            repudiare, ea laoreet mediocritatem eam.{' '}
          </p>
          <p>
            Eu est latine persius complectitur, ne definitiones reprehendunt eam. Ne ipsum decore
            mel, clita accusam nominati vis ex. In duo simul
          </p>
        </ShortDescription>
        <TrackActivity>
          <input type="checkbox" />
          Track change from previous version
        </TrackActivity>
        <Details>
          <SubTitle>Project Details</SubTitle>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce pharetra a lectus ac
            lobortis. Fusce eu sapien non mauris pharetra bibendum vulputate vitae quam. Donec purus
            risus, sollicitudin vitae turpis euismod, varius aliquam urna. Duis id mollis lectus.
            Sed luctus turpis lobortis, tempus metus ac, consectetur turpis. Lorem ipsum dolor sit
            amet, consectetur adipiscing elit. Integer quis lacinia tortor.
          </p>
          <p>
            Nam hendrerit turpis vitae lectus tincidunt, sed cursus risus varius. Sed luctus risus
            sed augue fermentum vehicula. Sed sit amet facilisis lectus. Sed pretium tempus tempus.
            Sed id felis vitae mauris varius luctus. Donec porttitor volutpat congue. Duis elementum
            nisl et malesuada faucibus. Quisque ex erat, efficitur vitae aliquet nec, malesuada
            condimentum turpis. Fusce tristique massa sed ex bibendum mollis. Pellentesque habitant
            morbi tristique senectus et netus et malesuada fames ac turpis egestas. Phasellus
            molestie arcu in nulla consectetur, dapibus tempus orci congue. Nam vitae justo leo.
            Duis pretium, neque ut aliquet luctus, ante nisl semper urna, et dignissim felis metus
            vitae neque. In porttitor sollicitudin turpis.
          </p>
          <p>
            Quisque porttitor aliquam lectus sit amet dictum. Vestibulum at velit id orci tincidunt
            finibus et ac eros. Morbi sed neque id turpis accumsan faucibus rhoncus a mauris. Cras
            ut justo consectetur, tincidunt ipsum non, efficitur justo. Lorem ipsum dolor sit amet,
            consectetur adipiscing elit. Aliquam erat volutpat. Ut hendrerit leo et maximus auctor.{' '}
          </p>
          <p>
            Sed elit felis, pretium a neque sed, vestibulum mattis orci. Suspendisse fringilla
            rhoncus libero, a posuere lacus imperdiet et. Fusce quis justo et libero posuere
            facilisis at ac lorem. Suspendisse potenti. Pellentesque semper massa a sapien malesuada
            luctus. Etiam nec tellus facilisis, tincidunt urna ac, consectetur orci. Praesent
            commodo malesuada ultricies. Nullam sodales tortor velit, ut viverra est mollis ac.
            Aenean luctus ex orci, non tempus turpis faucibus in. Donec at ultricies purus. Proin
            dolor nunc, tincidunt quis purus sit amet, viverra commodo urna. Praesent rutrum laoreet
            massa, eget faucibus erat tempor quis. Mauris dapibus eros nunc, eu elementum urna
            tincidunt id. Vestibulum tellus dolor, aliquam a accumsan sit amet, vehicula eu erat.
            Etiam sed rhoncus diam. Pellentesque pellentesque enim leo, non rutrum purus semper
            accumsan.
          </p>
          <p>
            Sed id posuere purus. Praesent fringilla massa vitae purus tincidunt dignissim. Praesent
            mi lorem, auctor non facilisis a, malesuada at magna. Fusce nec posuere dolor. Etiam et
            sollicitudin tellus. Quisque consequat est id varius tincidunt. Cras aliquam molestie
            augue, ac viverra nisl scelerisque sit amet. Etiam gravida magna sit amet efficitur
            bibendum. Duis lobortis fringilla tortor, pulvinar auctor lectus fringilla id. Etiam
            cursus nunc sit amet quam pretium sagittis nec ac odio. Nam fringilla vehicula purus.
            Nunc eget dapibus tortor. Quisque sed sodales lacus.
          </p>
        </Details>
      </DetailsContainer>
    );
  }
}
