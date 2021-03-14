import baseStyles from '../../styles/modules/common/base.module.scss'

export default function About (props) {

  const data = props.data

  return (
    <div className={baseStyles.main__container}>
      <h2>{data.name}</h2>
      <img src={data.name_image.url} />
    </div>
  )

}