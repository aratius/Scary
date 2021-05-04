import baseStyles from '../../styles/modules/common/base.module.scss'

interface Props {
  data: {
    name: string,
    name_image: {
      url: string
    }
  }
}

const About: React.FC<Props> = ({data}) => {

  return (
      <>


        <h2>{data.name}</h2>
        <br/>

        <p>・ STARRYWORKS inc. ( full time )</p>
        <p>・ front end developer / backpacker</p>
        <p>・ 2000.11.29, born in Hyogo</p>
        <p>・ osaka univercity of arts</p>
        <br/>

        <div>
          <h2>lang</h2>
          <br/>

          <h3>javascript</h3>
          <p>・ React.js</p>
          <p>・ Next.js</p>
          <p>・ pixi.js</p>
          <p>・ three.js</p>
          <br/>

          <h3>C++</h3>
          <p>・ openframeworks</p>
          <p>・ GLSL</p>
          <p>・ Arduino</p>
          <br/>

          <h3>C#</h3>
          <p>・ Unity</p>

        </div>


      </>
  )

}

export default About